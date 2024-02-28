package dev.jonathanguitar.Guitar.API.Controllers;

import dev.jonathanguitar.Guitar.API.Models.Friendship;
import dev.jonathanguitar.Guitar.API.Models.User;
import dev.jonathanguitar.Guitar.API.Services.FriendshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLOutput;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/friends")
public class FriendshipController {
    @Autowired
    private FriendshipService friendshipService;

    // CREATE ------------------------------------------------------------------------------------------------
    @PostMapping("/addNew")
    public ResponseEntity<?> addNewFriendship(@RequestBody Friendship friendship) {
        System.out.println("\n*** FriendshipController | addNewFriendship method ***");
        Friendship newFriendship = friendshipService.addNewFriendship(friendship);

        if (newFriendship == null) {
            System.out.println("This Friendship could not be added.");
            return new ResponseEntity<>("This Friendship COULD NOT be added. ", HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>("Friendship has been ADDED. " + newFriendship, HttpStatus.CREATED);
        }
    }

    // READ   ------------------------------------------------------------------------------------------------
    @GetMapping("/findMyFriends/{myId}")
    public ResponseEntity<List<User>> findMyFriends(@PathVariable("myId") Integer myId) {
        System.out.println("\n*** FriendshipController | findMyFriends method ***");
        return new ResponseEntity<>(friendshipService.findMyFriends(myId), HttpStatus.OK);
    }

    @GetMapping("/myRequests/{myId}")
    public ResponseEntity<List<User>> myRequests(@PathVariable("myId") Integer myId){
        System.out.println("\n*** FriendshipController | myRequests method ***");

        return new ResponseEntity<>(friendshipService.requestsToAccept(myId),HttpStatus.OK);

    }

    @GetMapping("/pendingRequests/{myId}")
    public ResponseEntity<List<User>> pendingRequests(@PathVariable("myId") Integer myId){
        System.out.println("\n*** FriendshipController | pendingRequests method ***");

        return new ResponseEntity<>(friendshipService.pendingRequests(myId), HttpStatus.OK);
    }

    // UPDATE ------------------------------------------------------------------------------------------------
    @PutMapping("/confirm")
    public ResponseEntity<Friendship> confirmFriendship(@RequestBody Friendship json){
        System.out.println("\n*** Friendship Controller | confirmFriendship method ***");

        return new ResponseEntity<>(friendshipService.confirmFriendRequest(json.getSenderId(), json.getReceiverId()), HttpStatus.OK);
    }
    // DELETE ------------------------------------------------------------------------------------------------
    @DeleteMapping("/deleteFriendship")
    public ResponseEntity<?> deleteFriendship(@RequestBody Friendship json) {
        System.out.println("\n*** FriendshipController | deleteFriendship method ***");

        Integer senderId = json.getSenderId();
        Integer receiverId = json.getReceiverId();

        Integer friendshipId = friendshipService.giveFriendshipId(senderId, receiverId);

        if (friendshipId == null) {
            return new ResponseEntity<>("This Friendship does NOT EXIST: " + json, HttpStatus.BAD_REQUEST);
        } else {
            friendshipService.deleteFriendship(friendshipId);
            System.out.println("This Friendship has been DELETED: " + json);
            return new ResponseEntity<>("This Friendship has been DELETED: " + json, HttpStatus.OK);
        }
    }
}
