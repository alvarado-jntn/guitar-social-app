package dev.jonathanguitar.Guitar.API.Controllers;

import dev.jonathanguitar.Guitar.API.Models.Credential;
import dev.jonathanguitar.Guitar.API.Services.CredentialService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/cred")
public class CredentialController {
    @Autowired
    private CredentialService credentialService;

    @GetMapping("/{username}/{password}")
    public ResponseEntity<Credential> findCredential(@PathVariable String username, @PathVariable String password) {
        System.out.println("*** CredentialController called | method : findCredential ***");

        return new ResponseEntity<Credential>(credentialService.findCredential(username, password), HttpStatus.OK);
    }
}
