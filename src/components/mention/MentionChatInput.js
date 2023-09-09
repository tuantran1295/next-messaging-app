'use client'
import {useEffect} from "react";
import {Mention, MentionsInput} from "react-mentions";
import defaultStyle from "./defaultStyle";
import defaultMentionStyle from "./defaultMentionStyle";
import {toast} from "react-toastify";
import {getAllUser} from "@/firebase/firestore/getData";
import {useAuthContext} from "@/context/AuthContext";
import {useNotificationContext} from "@/context/NotificationContext";

var users = [
    {
        id: "jack",
        display: "Jack",
    },
    {
        id: "john",
        display: "john",
    },
];

const MentionChatInput = ({value, onChange}) => {
    const {pusher} = useNotificationContext();
    const {user} = useAuthContext();

    useEffect(() => {
        fetchAllUsers();
    }, [])

    const fetchAllUsers = async () => {
        const {result, error} = await getAllUser();

        if (error) {
            console.log(error);
            toast.error(JSON.stringify(error), {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }

        // else successful
        console.log(result);
        window.sessionStorage.setItem('allUser', JSON.stringify(result));
        users = result;
        return result;
    };

    const onUserMentioned = (e) => {
        console.log("onUserMentioned", e);
        const mentionedUser = users.filter(u => u.id === e)[0];
        console.log(mentionedUser);
        pusher.trigger("chat-channel", "mentioned", {
            message: `${user.displayName} has mentioned you in a message.`,
            sender: {id: user.uid, name: user.displayName},
            receiver: {id: mentionedUser.uid, name: mentionedUser.displayName}
        });
    };
    return (
        <div className="single-line">
            <MentionsInput
                singleLine
                value={value}
                onChange={onChange}
                placeholder={"Type your message here..."}
                a11ySuggestionsListLabel={"Suggested mentions"}
                style={defaultStyle}
            >
                <Mention data={users} onAdd={onUserMentioned} style={defaultMentionStyle}/>
            </MentionsInput>
        </div>
    );
};

export default MentionChatInput;
