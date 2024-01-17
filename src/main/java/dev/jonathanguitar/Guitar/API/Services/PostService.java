package dev.jonathanguitar.Guitar.API.Services;

import dev.jonathanguitar.Guitar.API.Models.Post;
import dev.jonathanguitar.Guitar.API.Repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    // CREATE ------------------------------------------------------------------------------------------------
    public Post addNewPost(Post post) {
        return postRepository.save(post);
    }

    // READ   ------------------------------------------------------------------------------------------------
    public List<Post> findAll() {
        return postRepository.findAll();
    }

    public Optional<Post> findByPostId(Integer postId) {
        return postRepository.findById(postId);
    }

    public Optional<List<Post>> findByUserId(Integer userId) {
        return postRepository.findByUserId(userId);
    }
    // UPDATE ------------------------------------------------------------------------------------------------
    public Post updatePost(Integer postId, Post post) {
        Post updatePost = postRepository.getReferenceById(postId);
        updatePost.setTitle(post.getTitle());
        updatePost.setPostDate(post.getPostDate());
        updatePost.setBody(post.getBody());
        updatePost.setImageLink(post.getImageLink());


        return postRepository.save(updatePost);
    }

    public Post addLike (Integer postId){
        Post updatePost = postRepository.getReferenceById(postId);

        Integer likeCount = updatePost.getLikesCount();
        likeCount ++;
        updatePost.setLikesCount(likeCount);

        return postRepository.save(updatePost);
    }
    public Post removeLike (Integer postId){
        Post updatePost = postRepository.getReferenceById(postId);

        Integer likeCount = updatePost.getLikesCount();
        likeCount --;
        updatePost.setLikesCount(likeCount);

        return postRepository.save(updatePost);
    }
    // DELETE ------------------------------------------------------------------------------------------------
    public void deletePost (Integer postId){
        postRepository.deleteById(postId);
    }

}
