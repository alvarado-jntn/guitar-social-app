package dev.jonathanguitar.Guitar.API.Services;

import dev.jonathanguitar.Guitar.API.Models.Post;
import dev.jonathanguitar.Guitar.API.Repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.file.FileSystemLoopException;
import java.util.*;

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
        List<Post> rawPostsList = postRepository.findAll();
        Map<String, Integer> hashMap = new HashMap<>();
        List<Integer> idList = new ArrayList<>();
        List<Post> orderedPostList = new ArrayList<>();
        for (Post post : rawPostsList) {
            hashMap.put(post.getPostDate(), post.getPostId());
        }

        TreeMap<String, Integer> sortedPosts = new TreeMap<>(hashMap);

        for (Map.Entry<String, Integer> post : sortedPosts.entrySet()) {
            idList.add(post.getValue());
        }

        Collections.reverse(idList);

        for(Integer id:idList){
            orderedPostList.add(postRepository.getReferenceById(id));
        }


        return orderedPostList;
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

    public Post addLike(Integer postId) {
        Post updatePost = postRepository.getReferenceById(postId);

        Integer likeCount = updatePost.getLikesCount();
        likeCount++;
        updatePost.setLikesCount(likeCount);

        return postRepository.save(updatePost);
    }

    public Post removeLike(Integer postId) {
        Post updatePost = postRepository.getReferenceById(postId);

        Integer likeCount = updatePost.getLikesCount();
        likeCount--;
        updatePost.setLikesCount(likeCount);

        return postRepository.save(updatePost);
    }

    // DELETE ------------------------------------------------------------------------------------------------
    public void deletePost(Integer postId) {
        postRepository.deleteById(postId);
    }

}
