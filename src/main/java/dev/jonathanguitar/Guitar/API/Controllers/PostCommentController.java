package dev.jonathanguitar.Guitar.API.Controllers;

import dev.jonathanguitar.Guitar.API.Models.PostComment;
import dev.jonathanguitar.Guitar.API.Services.PostCommentService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/comments")
public class PostCommentController {
    @Autowired
    private PostCommentService postCommentService;

    // CREATE ------------------------------------------------------------------------------------------------
    @PostMapping("/addComment")
    public ResponseEntity<PostComment> createNewComment(@RequestBody PostComment json) {
        System.out.println("\n*** PostCommentController | createNewComment method ***");
        return new ResponseEntity<>(postCommentService.addNewComment(json), HttpStatus.CREATED);
    }

    // READ   ------------------------------------------------------------------------------------------------
    @GetMapping("/getComments/{postId}")
    public ResponseEntity<List<PostComment>> getComments(@PathVariable("postId") Integer postId) {
        System.out.println("\n*** PostCommentController | getComments method ***");
        return new ResponseEntity<>(postCommentService.getCommentsByPostId(postId), HttpStatus.OK);
    }

    // UPDATE ------------------------------------------------------------------------------------------------
    @PutMapping("/updateComment")
    public ResponseEntity<PostComment> updateComment(@RequestBody PostComment json) {
        System.out.println("\n*** PostCommentController | updateComment method ***");
        return new ResponseEntity<>(postCommentService.updateComment(json), HttpStatus.OK);
    }

    // DELETE ------------------------------------------------------------------------------------------------
    @DeleteMapping("/deleteComment/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable("commentId") Integer commentId, @RequestBody PostComment json) {
        System.out.println("\n*** PostCommentController | deleteComment method ***");

        Optional<PostComment> comment = postCommentService.findByCommentId(commentId);

        if (comment.isEmpty()) {
            System.out.println("Comment with this id does NOT EXIST: " + commentId);
            return new ResponseEntity<>("Comment with this id does NOT EXIST: " + commentId, HttpStatus.BAD_REQUEST);
        } else {
            postCommentService.deleteComment(json);
            System.out.println("Comment with this ID has been DELETED: " + commentId);
            return new ResponseEntity<>("Comment with this ID has been DELETED: " + commentId, HttpStatus.OK);
        }
    }
}
