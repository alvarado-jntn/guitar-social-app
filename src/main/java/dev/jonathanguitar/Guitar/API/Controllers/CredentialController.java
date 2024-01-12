package dev.jonathanguitar.Guitar.API.Controllers;

import dev.jonathanguitar.Guitar.API.Models.Credential;
import dev.jonathanguitar.Guitar.API.Services.CredentialService;
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
    public ResponseEntity<Credential> findByUsername(@PathVariable String username) {
        System.out.println("\n*** CredentialController called | method : findCredential ***");

        return new ResponseEntity<Credential>(credentialService.findByUsername(username), HttpStatus.OK);
    }

    // UPDATE ------------------------------------------------------------------------------------------------
    @PutMapping("updateUsername/{id}")
    public ResponseEntity<Credential> updateUsername(@RequestBody Credential json, @PathVariable("id") Integer id) {
        System.out.println("\n*** CredentialController called | method : updateUsername ***");

        String newUsername = json.getUsername();
        return new ResponseEntity<Credential>(credentialService.updateUsername(id, newUsername), HttpStatus.OK);

    }

    @PutMapping("/updatePassword/{id}")
    public ResponseEntity<Credential> updatePassword(@RequestBody Credential json, @PathVariable("id") Integer id) {
        System.out.println("\n*** CredentialController called | method : updatePassword ***");

        String newPassword = json.getPassword();
        return new ResponseEntity<Credential>(credentialService.updatePassword(id, newPassword), HttpStatus.OK);
    }

    // DELETE ------------------------------------------------------------------------------------------------


}
