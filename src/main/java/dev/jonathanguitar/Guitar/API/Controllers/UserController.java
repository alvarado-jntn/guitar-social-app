package dev.jonathanguitar.Guitar.API.Controllers;

import dev.jonathanguitar.Guitar.API.Models.User;
import dev.jonathanguitar.Guitar.API.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        System.out.println("*** UserController called | method : getAllUsers ***");

        return new ResponseEntity<List<User>>(userService.allUsers(), HttpStatus.OK);
    }

    @GetMapping("/{firstName}")
    public ResponseEntity<Optional<User>> getUserByFirstName(@PathVariable String firstName) {
        System.out.println("*** UserController called | method : getUserByFirstName ***");

        return new ResponseEntity<Optional<User>>(userService.findByFirstName(firstName), HttpStatus.OK);
    }
}
