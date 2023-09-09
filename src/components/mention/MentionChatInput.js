'use client'
import {useEffect, useState} from "react";
import {Mention, MentionsInput} from "react-mentions";
import defaultStyle from "./defaultStyle";
import defaultMentionStyle from "./defaultMentionStyle";
import {toast} from "react-toastify";
import {getAllUser} from "@/firebase/firestore/getData";

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
    useEffect(() => {
        fetchAllUsers();
    }, [])

    const fetchAllUsers = async () => {
        const { result, error } = await getAllUser();

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

    const onAdd = (e) => {
        console.log("onAdd", e);
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
                <Mention data={users} onAdd={onAdd} style={defaultMentionStyle}/>
            </MentionsInput>
        </div>
    );
};

export default MentionChatInput;
