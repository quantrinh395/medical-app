let mockUserData = [
    //First user object
    {
        "username" : "canle",
        "password" : "canle",
        "role" : "patient",
        "firstName" : "Trung Can",
        "lastName" : "Nguyen Le",
        "userData" : [
            {
                "username" : "doctor",
                "fullname" : "Dr. Mario",
                "comments" : "Gassy Tummy",
                "graphic_display" : null, // This is where we put the url link for dashboard image
                "date_of_upload" : "2021-03-28 11:25 AM" 
            },
            {
                "comments" : "Lessen the intake of sugar",
                "graphic_display" : null,
                "date_of_upload" : "2021-03-30 13:36 PM" 
            }
            ,
            {
                "comments" : "Yeah, you're getting fat",
                "graphic_display" : null,
                "date_of_upload" : "2021-03-31 15:22 PM" 
            }
        ]
    }
    // End of first user object. To create new user, use the similar format of data
    ,
    {
        "username" : "doctor",
        "password" : "doctor",
        "role" : "doctor",
        "firstName" : "Dr.",
        "lastName" : "Mario",
        "userData" : [
            {
                "username" : "canle",
                "fullname" : "Trung Can Nguyen Le",
                "comments" : "Diabetes",
                "graphic_display" : null,
                "date_of_upload" : "2021-03-28 11:25 AM" 
            },
            {
                "username" : "luigi1123",
                "fullname" : "Luigi",
                "comments" : "Lessen the intake of sugar",
                "graphic_display" : null,
                "date_of_upload" : "2021-03-30 13:36 PM" 
            }
            ,
            {
                "username" : "warrio1133",
                "fullname" : "Warrio",
                "comments" : "Yeah, you're getting fat",
                "graphic_display" : null,
                "date_of_upload" : "2021-03-31 15:22 PM" 
            }
        ]
    }
]

// This is hardcoded array messages, will only be updated when server is running. If server is restart. The 
// whole object will reset to this state
let messages = [
    {
        "username" : "doctor",
        "fullname" : "Dr. Mario",
        "msg_history" : {
            "canle" : [
                {
                    "from" : "doctor",
                    "to" : "canle",
                    "content" : "Hey What's up? Nigga",
                    "time_sent" : "2021-04-02 14:42:17"
                },
                {
                    "from" : "canle",
                    "to" : "doctor",
                    "content" : "Not much, you?",
                    "time_sent" : "2021-04-02 14:42:30"
                }
            ]
        }
    },
    {
        "username" : "canle",
        "fullname" : "Nguyen Le Trung can",
        "msg_history" : {
            "doctor" : [
                {
                    "from" : "doctor",
                    "to" : "canle",
                    "content" : "Hey What's up? Nigga",
                    "time_sent" : "2021-04-02 14:42:17"
                },
                {
                    "from" : "canle",
                    "to" : "doctor",
                    "content" : "Not much, you?",
                    "time_sent" : "2021-04-02 14:42:30"
                }
            ]
        }
    }
]

module.exports = {
    mockUserData: mockUserData,
    messages: messages
}