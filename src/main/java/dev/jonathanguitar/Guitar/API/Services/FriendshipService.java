package dev.jonathanguitar.Guitar.API.Services;

import dev.jonathanguitar.Guitar.API.Models.Friendship;
import dev.jonathanguitar.Guitar.API.Models.User;
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

    @Autowired
    private UserService userService;

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

    public List<User> findMyFriends(Integer myId) {
        System.out.println("\n ---- FriendshipService | findMyFriends method ----");

        List<User> friendList = new ArrayList<>();

        List<Friendship> senderList = friendshipRepository.findBySenderId(myId);
        List<Friendship> receiverList = friendshipRepository.findByReceiverId(myId);

        // If I was the sender, then get the receivers only
        for (Friendship record : senderList) {
            if (record.getConfirmed() == 1) {
                Integer friendId = record.getReceiverId();
                User friend = userService.findByUserId(friendId);
                User makeFriend= new User();

                makeFriend.setUserId(friendId);
                makeFriend.setFirstName(friend.getFirstName());

                friendList.add(makeFriend);
            }
        }
        // If I was the receiver, then get the senders only
        for (Friendship record : receiverList) {
            if (record.getConfirmed() == 1) {
                Integer friendId = record.getSenderId();
                User friend = userService.findByUserId(friendId);
                User makeFriend= new User();

                makeFriend.setUserId(friendId);
                makeFriend.setFirstName(friend.getFirstName());

                friendList.add(makeFriend);
            }
        }

        return friendList;
    }

    public List<User> requestsToAccept(Integer receiverId){
        List<Friendship> entireList = friendshipRepository.findByReceiverId(receiverId);
        List<User> requestList = new ArrayList<>();

        for(Friendship record: entireList){
            if(record.getConfirmed().equals(0)){
                Integer id = record.getSenderId();
                User friend = userService.findByUserId(id);
                User makeFriend = new User();

                makeFriend.setUserId(id);
                makeFriend.setFirstName(friend.getFirstName());

                requestList.add(makeFriend);
            }
        }

        return requestList;
    }

    public List<User> pendingRequests(Integer senderId){
        List<Friendship> entireList = friendshipRepository.findBySenderId(senderId);
        List<User> pendingList = new ArrayList<>();

        for(Friendship record:entireList){
            if(record.getConfirmed().equals(0)){
                Integer id = record.getReceiverId();
                User friend = userService.findByUserId(id);
                User makeFriend= new User();

                makeFriend.setUserId(id);
                makeFriend.setFirstName(friend.getFirstName());

                pendingList.add(makeFriend);
            }
        }
        return pendingList;
    }

    // UPDATE ------------------------------------------------------------------------------------------------

    public Friendship confirmFriendRequest(Integer senderId, Integer receiverId) {
        Integer friendshipId = giveFriendshipId(senderId, receiverId);

        Friendship updatedFriendship = friendshipRepository.getReferenceById(friendshipId);
        updatedFriendship.setConfirmed(1);

        return friendshipRepository.save(updatedFriendship);
    }

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
