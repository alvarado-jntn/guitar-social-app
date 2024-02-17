package dev.jonathanguitar.Guitar.API.Controllers;

import dev.jonathanguitar.Guitar.API.Models.Credential;
import dev.jonathanguitar.Guitar.API.Models.User;
import dev.jonathanguitar.Guitar.API.Services.CredentialService;
import dev.jonathanguitar.Guitar.API.Services.UserService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.rmi.ServerException;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/cred")
public class CredentialController {
    @Autowired
    private CredentialService credentialService;
    @Autowired
    private UserService userService;

    // CREATE ------------------------------------------------------------------------------------------------
    @PostMapping("/newCredential")
    public ResponseEntity<Credential> addNewCredential(@RequestBody Credential c) throws ServerException {
        System.out.println("\n*** CredentialController called | method : addNewCredential ***");

        Credential addCredential = credentialService.addNewCredential(c);
        if (addCredential == null) {
            throw new ServerException("There was an error adding this new user's credentials.");
        } else {
            return new ResponseEntity<>(addCredential, HttpStatus.CREATED);
        }

    }

    // READ   ------------------------------------------------------------------------------------------------

    @GetMapping("/find/{id}")
    public ResponseEntity<Optional<Credential>> findById(@PathVariable("id") Integer id) {
        System.out.println("\n*** CredentialController called | method : findById ***");

        return new ResponseEntity<>(credentialService.findById(id), HttpStatus.OK);
    }

    @GetMapping("/{username}")
    public ResponseEntity<Credential> findByUsername(@PathVariable("username") String username) {
        System.out.println("\n*** CredentialController called | method : findCredential ***");

        return new ResponseEntity<Credential>(credentialService.findByUsername(username), HttpStatus.OK);
    }

    @GetMapping("/getDetails/username/{userId}")
    public ResponseEntity<String> findUsername(@PathVariable("userId") Integer userId) {
        System.out.println("\n*** CredentialController | findUsername method ***");
        return new ResponseEntity<>(credentialService.giveUsername(userId), HttpStatus.OK);
    }

    // UPDATE ------------------------------------------------------------------------------------------------

    @PostMapping("/login")
    public ResponseEntity<Optional<User>> login(@RequestBody Credential json) {
        System.out.println("\n*** CredentialController | login method ***");
        Integer userId = credentialService.loginToGetUserId(json.getUsername(), json.getPassword());

        //if username and password match, return that user.
        // if they don't match, return false
        return new ResponseEntity<>(userService.findById(userId), HttpStatus.OK);
    }


    @PostMapping("/checkUsername")
    public ResponseEntity<Boolean> checkUsername(@RequestBody Credential json) {
        System.out.println("\n*** CredentialController | findCredential method ***");

        return new ResponseEntity<>(credentialService.checkUsername(json.getUsername()), HttpStatus.OK);

    }

    @PutMapping("/updateUsername")
    public ResponseEntity<String> updateUsername(@RequestBody Credential json) {
        System.out.println("\n*** CredentialController | updateUsername method ***");
        Integer id = json.getUserId();
        String newUsername = json.getUsername();
        return new ResponseEntity<>(credentialService.updateUsername(id, newUsername), HttpStatus.OK);

    }

    @PutMapping("/updatePassword")
    public ResponseEntity<?> updatePassword(@RequestBody Credential json) {
        System.out.println("\n*** CredentialController | updatePassword method ***");
        Integer id = json.getUserId();
        String newPassword = json.getPassword();
        credentialService.updatePassword(id, newPassword);

        return new ResponseEntity<>("Password updated for this user.", HttpStatus.OK);
    }

    // DELETE ------------------------------------------------------------------------------------------------


}
