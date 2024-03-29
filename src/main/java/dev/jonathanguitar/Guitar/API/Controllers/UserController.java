package dev.jonathanguitar.Guitar.API.Controllers;

import dev.jonathanguitar.Guitar.API.Models.User;
import dev.jonathanguitar.Guitar.API.Services.UserService;
import org.apache.tomcat.util.http.parser.HttpParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.rmi.ServerException;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    // CREATE ------------------------------------------------------------------------------------------------
    @PostMapping("/addNewUser")
    public ResponseEntity<User> addNewUser(@RequestBody User user) throws ServerException {
        System.out.println("\n*** UserController | addNewUser method ***");

        User addUser = userService.addNewUser(user);
        if (addUser == null) {
            throw new ServerException("There is an error. USER IS NULL.");
        } else {
            return new ResponseEntity<>(addUser, HttpStatus.CREATED);
        }
    }

    // READ ------------------------------------------------------------------------------------------------
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        System.out.println("\n*** UserController | getAllUsers method ***");

        return new ResponseEntity<List<User>>(userService.allUsers(), HttpStatus.OK);
    }

    @GetMapping("/{firstName}")
    public ResponseEntity<Optional<User>> getUserByFirstName(@PathVariable("firstName") String firstName) {
        System.out.println("\n*** UserController | getUserByFirstName method ***");

        return new ResponseEntity<Optional<User>>(userService.findByFirstName(firstName), HttpStatus.OK);
    }

    @GetMapping("/allEmails")
    public ResponseEntity<List<String>> getAllEmails(){
        System.out.println("\n*** UserController | getUserByFirstName method ***");

        return  new ResponseEntity<>(userService.getAllEmails(), HttpStatus.OK);
    }

    @GetMapping("/firstName/{userId}")
    public ResponseEntity<String> getNameFromId(@PathVariable("userId") Integer userId){
        return new ResponseEntity<>(userService.getNameFromId(userId),HttpStatus.OK);
    }

    @GetMapping("/find/singleUser/{userId}")
    public ResponseEntity<Optional<User>> getSingleUser(@PathVariable("userId") Integer userId){
        return new ResponseEntity<>(userService.findById(userId), HttpStatus.OK);
    }

    // UPDATE ------------------------------------------------------------------------------------------------
    @PostMapping("/checkEmail")
    public ResponseEntity<Boolean> checkEmail (@RequestBody User json){
        System.out.println("\n*** UserController | checkEmail method ***");

        return new ResponseEntity<>(userService.checkEmail(json.getEmail()),HttpStatus.OK);
    }

    @PutMapping("/updateUser/{id}")
    public ResponseEntity<User> updateUser(@RequestBody User user, @PathVariable("id") Integer id) {
        System.out.println("\n*** UserController | updateUser method ***");

        User u = userService.updateUser(id, user);
        return new ResponseEntity<>(u, HttpStatus.OK);
    }
    // DELETE ------------------------------------------------------------------------------------------------

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Integer id) {
        System.out.println("\n*** UserController | deleteUser method ***");

        Optional<User> user = userService.findById(id);

        if (user.isEmpty()) {
            return new ResponseEntity<>("User with this id does NOT EXIST: " + id, HttpStatus.BAD_REQUEST);
        } else {
            userService.deleteUser(id);
            System.out.println("User with this ID has been DELETED: " + id);
            return new ResponseEntity<>("User with this ID has been DELETED: " + id, HttpStatus.OK);
        }

    }


}
