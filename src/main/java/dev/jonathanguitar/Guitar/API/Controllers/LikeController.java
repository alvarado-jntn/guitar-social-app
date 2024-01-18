package dev.jonathanguitar.Guitar.API.Controllers;

import dev.jonathanguitar.Guitar.API.Models.Like;
import dev.jonathanguitar.Guitar.API.Services.LikeService;
import dev.jonathanguitar.Guitar.API.Services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/likes")
public class LikeController {
    @Autowired
    private LikeService likeService;

    // CREATE ------------------------------------------------------------------------------------------------
    @PostMapping("/addLike")
    public ResponseEntity<Optional<Like>> addNewLike(@RequestBody Like like) {
        System.out.println("\n*** LikeController called | method : addNewLike ***");
        return new ResponseEntity<>(likeService.addNewLike(like), HttpStatus.CREATED);
    }

    // READ   ------------------------------------------------------------------------------------------------
    @GetMapping("/getAll/{id}")
    public ResponseEntity<List<Like>> findByPostId(@PathVariable("id") Integer id) {
        System.out.println("\n*** LikeController called | method : findByPostId ***");
        return new ResponseEntity<>(likeService.findLikesByPostId(id), HttpStatus.OK);
    }

    // UPDATE ------------------------------------------------------------------------------------------------
    // DELETE ------------------------------------------------------------------------------------------------
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteLike(@RequestBody Like jsonLike) {
        System.out.println("\n*** LikeController called | method : deleteLike ***");
        Like thisLike = likeService.findByPostAndUserId(jsonLike.getPostId(), jsonLike.getUserId());

        if (thisLike == null) {
            return new ResponseEntity<>("This Like DOES NOT EXIST.", HttpStatus.BAD_REQUEST);
        } else {
            System.out.println("This Like has been DELETED: " + thisLike);
            likeService.deleteLike(thisLike);
            return new ResponseEntity<>("This Like has been DELETED: " + thisLike, HttpStatus.OK);
        }
    }
}
