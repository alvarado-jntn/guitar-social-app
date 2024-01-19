package dev.jonathanguitar.Guitar.API.Services;

import dev.jonathanguitar.Guitar.API.Models.PostComment;
import dev.jonathanguitar.Guitar.API.Repositories.PostCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostCommentService {
    @Autowired
    private PostCommentRepository postCommentRepository;

    // CREATE ------------------------------------------------------------------------------------------------
    public PostComment addNewComment(PostComment comment) {
        return postCommentRepository.save(comment);
    }

    // READ   ------------------------------------------------------------------------------------------------
    public List<PostComment> getCommentsByPostId(Integer postId) {
        return postCommentRepository.findAllCommentsByPostId(postId);
    }

    public Optional<PostComment> findByCommentId(Integer commentId){
        return postCommentRepository.findById(commentId);
    }

    // UPDATE ------------------------------------------------------------------------------------------------
    public PostComment updateComment(PostComment comment) {
        PostComment updatedComment = postCommentRepository.getReferenceById(comment.getCommentId());
        updatedComment.setCommentText(comment.getCommentText());
        updatedComment.setCommentDate(comment.getCommentDate());

        return postCommentRepository.save(updatedComment);
    }

    // DELETE ------------------------------------------------------------------------------------------------
    public void deleteComment(PostComment comment) {
        postCommentRepository.delete(comment);
    }


}
