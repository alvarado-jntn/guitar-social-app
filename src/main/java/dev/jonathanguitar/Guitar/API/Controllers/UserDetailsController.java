package dev.jonathanguitar.Guitar.API.Controllers;

import dev.jonathanguitar.Guitar.API.Models.UserDetails;
import dev.jonathanguitar.Guitar.API.Services.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/details")
public class UserDetailsController {
    @Autowired
    private UserDetailsService userDetailsService;

    // CREATE ------------------------------------------------------------------------------------------------
    @PostMapping("/addDetails")
    public ResponseEntity<UserDetails> addDetails (@RequestBody UserDetails details){
        System.out.println("\n*** UserDetailsController called | method : addDetails ***");

        return new ResponseEntity<UserDetails>(userDetailsService.addNewDetails(details), HttpStatus.CREATED);

    }
    // READ   ------------------------------------------------------------------------------------------------
    @GetMapping("/find/{id}")
    public ResponseEntity<Optional<UserDetails>> findDetails(@PathVariable("id") Integer id){
        System.out.println("\n*** UserDetailsController called | method : findDetails ***");

        return new ResponseEntity<Optional<UserDetails>>(userDetailsService.getSingleDetails(id), HttpStatus.OK);
    }
    // UPDATE ------------------------------------------------------------------------------------------------
    @PutMapping("/updateDetails/{id}")
    public ResponseEntity<UserDetails> updateDetails(@PathVariable("id") Integer id, @RequestBody UserDetails userDetails){
        System.out.println("\n*** UserDetailsController called | method : updateDetails ***");

        UserDetails updatedDetails = userDetailsService.updateDetails(id, userDetails);

        return new ResponseEntity<>(updatedDetails,HttpStatus.OK);

    }
    // DELETE ------------------------------------------------------------------------------------------------
}
