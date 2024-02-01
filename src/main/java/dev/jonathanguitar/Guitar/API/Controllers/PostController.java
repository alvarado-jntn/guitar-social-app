package dev.jonathanguitar.Guitar.API.Controllers;

import dev.jonathanguitar.Guitar.API.Models.Post;
import dev.jonathanguitar.Guitar.API.Services.PostService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/posts/")
public class PostController {

    @Autowired
    private PostService postService;

    // CREATE ------------------------------------------------------------------------------------------------
    @PostMapping("/newPost")
    public ResponseEntity<Post> createNewPost(@RequestBody Post json) {
        System.out.println("\n*** PostController called | method : createNewPost ***");

        return new ResponseEntity<Post>(postService.addNewPost(json), HttpStatus.CREATED);
    }

    // READ   ------------------------------------------------------------------------------------------------
    @GetMapping("/all")
    public ResponseEntity<List<Post>> getAllPosts() {
        System.out.println("\n*** PostController called | method : getAllPosts ***");
        return new ResponseEntity<>(postService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/findByPostId/{postId}")
    public ResponseEntity<Optional<Post>> getByPostId(@PathVariable("postId") Integer postId) {
        System.out.println("\n*** PostController called | method : getByPostId ***");
        return new ResponseEntity<>(postService.findByPostId(postId), HttpStatus.OK);
    }

    @GetMapping("/findByUserId/{userId}")
    public ResponseEntity<Optional<List<Post>>> getByUserId(@PathVariable("userId") Integer userId) {
        System.out.println("\n*** PostController called | method : getByUserId ***");
        return new ResponseEntity<>(postService.findByUserId(userId), HttpStatus.OK);

    }

    // UPDATE ------------------------------------------------------------------------------------------------
    @PutMapping("/update/{postId}")
    public ResponseEntity<Post> updatePost(@PathVariable("postId") Integer postId, @RequestBody Post post) {
        System.out.println("\n*** PostController called | method : updatePost ***");

        return new ResponseEntity<>(postService.updatePost(postId, post), HttpStatus.OK);
    }

    @PutMapping("/addLike/{postId}")
    public ResponseEntity<?> addLike(@PathVariable("postId") Integer postId) {
        System.out.println("\n*** PostController called | method : addLike ***");

        Optional<Post> post = postService.findByPostId(postId);

        if (post.isEmpty()) {
            return new ResponseEntity<>("Post with this id does NOT EXIST: " + postId, HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(postService.addLike(postId), HttpStatus.OK);
        }
    }

    @PutMapping("/removeLike/{postId}")
    public ResponseEntity<?> removeLike(@PathVariable("postId") Integer postId) {
        System.out.println("\n*** PostController called | method : removeLike ***");

        Optional<Post> post = postService.findByPostId(postId);
        if (post.isEmpty()) {
            return new ResponseEntity<>("Post with this id does NOT EXIST: " + postId, HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(postService.removeLike(postId), HttpStatus.OK);
        }


    }

    // DELETE ------------------------------------------------------------------------------------------------
    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<?> deletePost(@PathVariable("postId") Integer postId) {
        System.out.println("\n*** PostController called | method : deletePost ***");

        Optional<Post> post = postService.findByPostId(postId);

        if (post.isEmpty()) {
            return new ResponseEntity<>("Post with this id does NOT EXIST: " + postId, HttpStatus.BAD_REQUEST);
        } else {
            postService.deletePost(postId);
            System.out.println("Post with this ID has been DELETED: " + postId);
            return new ResponseEntity<>("Post with this ID has been DELETED: " + postId, HttpStatus.OK);
        }
    }

}
