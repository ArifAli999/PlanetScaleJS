import React, { useEffect, useState } from "react";
import { useChannel, usePresence } from "@ably-labs/react-hooks";
import AddCommentSection from "./AddCommentSection";



function Comments({ comment }) {
    const [comments, setComments] = useState(comment);









    const [channel] = useChannel("New Room", (message) => {
        // Add new incoming comment to the list of comments
        setComments((comments) => {
            return [...comments, message.data];
        });

        console.log(message)
    });

    const submitComment = async (username, comment, Channel) => {
        try {
            const body = { username, comment, Channel };
            await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/comment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            channel.publish({
                name: "New Room",
                data: {
                    username,
                    comment,
                    Channel

                },
            });
        } catch (error) {
            console.error("An error occurred when creating a comment: ", error);
        }
    };


    return (
        <div>Comments ({comments && comments.length})

            {comments && comments.map((m, index) => (
                <p key={index}>{m.username} : {m.comment}</p>
            ))}





            <AddCommentSection submitComment={submitComment} />
        </div>
    )
}

export default Comments