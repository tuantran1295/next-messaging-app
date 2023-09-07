import {useState} from "react";
import {Mention, MentionsInput} from "react-mentions";
import defaultStyle from "./defaultStyle";
import defaultMentionStyle from "./defaultMentionStyle";

const users = [
    {
        id: "jack",
        display: "Jack",
    },
    {
        id: "john",
        display: "john",
    },
];

const fetchUsers = (query, callback) => {
    if (!query) return;

    setTimeout(() => {
        const filteredUsers = users.filter((user) =>
            user.display.toLowerCase().includes(query)
        );
        callback(filteredUsers);
    }, 2000);
};

const MentionChatInput = ({value, onChange}) => {
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
