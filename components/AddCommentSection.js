import React, { useState } from "react";



export default function AddCommentSection({ submitComment }) {
    const [username, setUsername] = useState("");
    const [comment, setComment] = useState("");

    const addComment = () => {
        //Publish message
        const room = 'Riffys'
        submitComment(username, comment, room);
        //Reset form
        //  setUsername("");
        setComment("");
    };

    return (
        <div>
            <div >
                <div >
                    <input
                        required
                        id="username"
                        name="username"
                        label="Username"

                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div >
                    <br />
                    <input
                        required
                        id="comment"
                        name="comment"
                        label="Comment"

                        rows={4}
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                    />
                </div>
                <div >
                    <br />  <br />
                    <button onClick={addComment}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}