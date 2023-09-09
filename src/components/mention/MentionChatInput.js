'use client'
import {useEffect} from "react";
import "./mentionStyle.css";
import {Mention, MentionsInput} from "react-mentions";
import defaultStyle from "./defaultStyle";
import defaultMentionStyle from "./defaultMentionStyle";
import {toast} from "react-toastify";
import {getAllUser} from "@/firebase/firestore/getData";

var userList = [
    {
        id: "jack",
        display: "Jack",
    },
    {
        id: "john",
        display: "john",
    },
];

const MentionChatInput = ({value, onChange, onUserMentioned, onMentionRemove}) => {
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
        userList = result;
        return result;
    };

    const onMentionedAdd = (e) => {
        console.log("onUserMentioned", e);
        const mentionedUser = userList.filter(u => u.id === e)[0];
        console.log(mentionedUser);
        onUserMentioned(mentionedUser);
    }

    const onMentionedRemove = (e) => {
        console.log("onUserRemoved", e);
        const removedUser = userList.filter(u => u.id === e)[0];
        console.log(removedUser);
        onMentionRemove(removedUser);
    }

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
                <Mention data={userList} onAdd={onMentionedAdd} onRemove={onMentionedRemove} style={defaultMentionStyle}/>
            </MentionsInput>
        </div>
    );
};

export default MentionChatInput;
