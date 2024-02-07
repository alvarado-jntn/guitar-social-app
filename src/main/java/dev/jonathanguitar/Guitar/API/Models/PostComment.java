package dev.jonathanguitar.Guitar.API.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "post_comments")
@Data //This takes care of getter and setter methods.
@NoArgsConstructor
@AllArgsConstructor
public class PostComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer commentId;
    private Integer postId;
    private Integer userId;
    private String commentText;
    private String commentDate;

    @ManyToOne
    @JoinColumn(name = "postId", nullable = false, insertable = false, updatable = false)
    private Post post;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false, insertable = false, updatable = false)
    private User user;
    

}
