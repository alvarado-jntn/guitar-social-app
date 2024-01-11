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

    @PostMapping("/{username}")
    public ResponseEntity<Credential> findByUsername(@PathVariable String username) {
        System.out.println("\n*** CredentialController called | method : findCredential ***");

        return new ResponseEntity<Credential>(credentialService.findByUsername(username), HttpStatus.OK);
    }

    @PostMapping("/newCredential")
    public ResponseEntity<Credential> addNewCredential(@RequestBody Credential c) throws ServerException{
        System.out.println("\n*** CredentialController called | method : addNewCredential ***");

//        Credential c = new Credential();
//        System.out.println("json.get userId:  " + json.get("userId"));
//        System.out.println("json.get userId TYPE:  " + json.get("userId").getClass().getSimpleName());
//
//        Integer userId = Integer.parseInt(json.get("userId")) ;
//        System.out.println("\nuserId TYPE:  " + userId.getClass().getSimpleName());
//
////        c.setUserId(userId);
//        c.setUsername(json.get("username"));
//        c.setPassword(json.get("password"));
//        System.out.println("\nPrinting c:  " + c);

        Credential addCredential = credentialService.addNewCredential(c);
        if (addCredential == null){
            throw new ServerException("There was an error adding this new user's credentials.");
        } else {
            return new ResponseEntity<>(addCredential, HttpStatus.CREATED);
        }
//        return new ResponseEntity<>(credentialService.addNewCredential(c), HttpStatus.CREATED);

    }
}
