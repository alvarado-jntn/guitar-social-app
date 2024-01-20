package dev.jonathanguitar.Guitar.API.Services;

import dev.jonathanguitar.Guitar.API.Models.Friendship;
import dev.jonathanguitar.Guitar.API.Repositories.FriendshipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class FriendshipService {
    @Autowired
    private FriendshipRepository friendshipRepository;
    @Autowired
    private CredentialService credentialService;

    // CREATE ------------------------------------------------------------------------------------------------

    public boolean selfCheck(Friendship friendship) {
        System.out.println("\n---------------------- Friend Service | selfCheck");
        Integer senderId = friendship.getSenderId();
        Integer receiverId = friendship.getReceiverId();
        //Return true if they are NOT equal. Return false if they are equal.
        boolean answer = !senderId.equals(receiverId);
        if (answer) {
            System.out.println("selfCheck PASSED. User is not adding self as friend.");
        } else {
            System.out.println("selfCheck FAILED. User is adding self as friend.");
        }
        return answer;
    }

    public boolean newFriendCheck(Friendship friendship) {
        System.out.println("\n---------------------- Friend Service | newFriendCheck");
        Integer senderId = friendship.getSenderId();
        Integer receiverId = friendship.getReceiverId();

        boolean answer = true;

        List<Friendship> firstList = friendshipRepository.findBySenderId(senderId);
        List<Friendship> secondList = friendshipRepository.findBySenderId(receiverId);

        for (Friendship record : firstList) {
            if (record.getReceiverId().equals(receiverId)) {
                System.out.println("newFriendCheck FAILED. This Friendship already exists.");
                answer = false;
                break;
            }
        }
        for (Friendship record : secondList) {
            if (record.getReceiverId().equals(senderId)) {
                System.out.println("newFriendCheck FAILED. This Friendship already exists.");
                answer = false;
                break;
            }
        }
        return answer;
    }

    public Friendship addNewFriendship(Friendship friendship) {
        System.out.println("\n---------------------- Friend Service | addNewFriendship ----------------------");

        // Person cannot be friends with themselves.
        boolean selfCheck = selfCheck(friendship);

        // Friendship must be unique.
        boolean newFriendCheck = newFriendCheck(friendship);

        if (selfCheck && newFriendCheck) {
            System.out.println("Saving New Friendship.");
            return friendshipRepository.save(friendship);
        } else {
            System.out.println("This Friendship record COULD NOT be added to database.");
            return null;
        }
    }

    // READ   ------------------------------------------------------------------------------------------------
    public List<Friendship> findAll() {
        return friendshipRepository.findAll();
    }

    public Optional<Friendship> findByFriendshipId(Integer friendshipId) {
        return friendshipRepository.findById(friendshipId);
    }

    public List<String> findMyFriends(Integer myId) {
        System.out.println("\n ---- FriendshipService | findMyFriends method ----");
        /**
         * This method accepts user X's id.
         * It takes that id and searches the friendships table to find every record where it is either the
         * sender id or the receiver id.
         * It will take the opposite column and store it in a list of Integers.
         * That list will be iterated over in order to find the corresponding usernames of the friendship.
         * This method will return a list of strings, or rather a list of the usernames that are friends of user X.
         */

        List<Integer> friendIdList = new ArrayList<>();
        List<String> friendUsernameList = new ArrayList<>();

        List<Friendship> senderList = friendshipRepository.findBySenderId(myId);
        List<Friendship> receiverList = friendshipRepository.findByReceiverId(myId);

        // If I was the sender, then get the receivers only
        for (Friendship record : senderList) {
            Integer friendId = record.getReceiverId();
            System.out.println("printing receiver ID from senderList: " + friendId);
            friendIdList.add(friendId);
        }
        // If I was the receiver, then get the senders only
        for (Friendship record : receiverList) {
            Integer friendId = record.getSenderId();
            System.out.println("printing sender ID from receiverList: " + friendId);
            friendIdList.add(friendId);
        }
        System.out.println("friendIdList: " + friendIdList);

        for (Integer id : friendIdList) {
            String username = credentialService.giveUsername(id);
            friendUsernameList.add(username);
        }
        System.out.println("friendUsernameList: " + friendUsernameList);

        return friendUsernameList;
    }

    // UPDATE ------------------------------------------------------------------------------------------------
    // DELETE ------------------------------------------------------------------------------------------------
    public Integer giveFriendshipId(Integer senderId, Integer receiverId) {
        List<Friendship> firstList = friendshipRepository.findBySenderId(senderId);
        List<Friendship> secondList = friendshipRepository.findBySenderId(receiverId);
        Integer friendshipId = 0;
        boolean trySecondList = true;

        for (Friendship record : firstList) {
            if (record.getReceiverId().equals(receiverId)) {
                friendshipId = record.getFriendshipId();
                trySecondList = false;
                break;
            }
        }
        if (trySecondList) {
            for (Friendship record : secondList) {
                if (record.getReceiverId().equals(senderId)) {
                    friendshipId = record.getFriendshipId();
                    break;
                }
            }
        }

        if (friendshipId != 0) {
            return friendshipId;
        } else {
            return null;
        }
    }

    public void deleteFriendship(Integer friendshipId) {

        friendshipRepository.deleteById(friendshipId);

    }
}