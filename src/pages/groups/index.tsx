// Imports
import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import Header from "./../smallheader";
import Footer from "../../assets/includes/footer";
import { useRouter } from "next/router";

// Member object
interface Member {
  membername: string;
  contact: string;
}

/**
 * This function creates an array of Member objects from list of member fields.
 * @param members List of members not in an array of members.
 * @returns an array of Member objects.
 */
function convertToMembersArray(members: Record<string, Member>): Member[] {
  const memberList: Member[] = [];
  // Push each Member object to the array.
  for (const [key, value] of Object.entries(members)) {
    const { membername, contact } = value;
    memberList.push({ membername, contact });
  }
  // Remove the first empty row.
  memberList.reverse();
  memberList.pop();
  memberList.reverse();
  return memberList;
}

const ViewLists = () => {
  // Router
  const router = useRouter();

  const [groups, setGroups] = useState<string[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>("");

  const [username, setUsername] = useState<string>("");
  const [members, setMembers] = useState<Member[]>([]);

  const [newmembername, setNewmembername] = useState<string>("");
  const [newmembercontact, setNewmembercontact] = useState<string>("");

  const [addmemberstatus, setAddmemberstatus] = useState<string>("");

  const [messageToSend, setMessageToSend] = useState<string>("");
  const [titleToSend, setTitleToSend] = useState<string>("");

  // When a state changes, refresh the groups list.
  useEffect(() => {
    // Calls API to retrieve a list of groups for a user.
    const fetchGroups = async () => {
      const res = await fetch(
        "https://zhwuzz7e9e.execute-api.us-east-1.amazonaws.com/test/retrievelists",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        }
      );
      const data = await res.json();
      if (data["body"]) {
        setGroups(JSON.parse(data["body"]));
      }
    };

    const storedUsername = sessionStorage.getItem("username");
    // Retrieve a fresh list of groups.
    if (storedUsername) {
      setUsername(storedUsername);
      fetchGroups();
    }
  }, [username]);

  // Choose to view a specific group; hence, fetch members in the group.
  function selectgroup(selectedgroupname: string) {
    setSelectedGroup(selectedgroupname);
    fetchContact(selectedgroupname);
  }

  // This function Retrieves a list of members in a group.
  const fetchContact = async (selectedGroup: string) => {
    const res = await fetch(
      "https://zhwuzz7e9e.execute-api.us-east-1.amazonaws.com/test/retrievemembers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, groupname: selectedGroup }),
      }
    );
    const data = await res.json();

    // Update array of members.
    if (data["body"]) {
      setMembers(convertToMembersArray(JSON.parse(data["body"])));
    }
  };

  // This function calls API to add a member to a group.
  const addmember = async (event: FormEvent) => {
    event.preventDefault();

    // Call the ADDMEMBER API gateway.
    const res = await fetch(
      "https://6ffo8aqo89.execute-api.us-east-1.amazonaws.com/notifyall/useraction",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "ADDMEMBER",
          username,
          groupname: selectedGroup,
          membername: newmembername,
          contact: newmembercontact,
        }),
      }
    );

    // Result received from the API.
    const data = await res.json();
    fetchContact(selectedGroup);
    setAddmemberstatus(JSON.parse(data["body"])["message"]);

    // Empty the form.
    if (JSON.parse(data["body"])["message"] == "Member added successfully") {
      alert(
        "New member added successfully! Make sure to let the members know that they have been added, and must confirm their e-mail before receiving any messages!"
      );
      setNewmembercontact("");
      setNewmembername("");
    }
  };

  // This function removes a member from a group.
  const removemember = async (membercontacttoremove: string) => {
    // Calls the REMOVEMEMBER API
    const res = await fetch(
      "https://6ffo8aqo89.execute-api.us-east-1.amazonaws.com/notifyall/useraction",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "REMOVEMEMBER",
          username,
          groupname: selectedGroup,
          contact: membercontacttoremove,
        }),
      }
    );

    // Result received from the API.
    const data = await res.json();
    // Refresh the memebers of the group.
    fetchContact(selectedGroup);
    // Update the status.
    setAddmemberstatus(JSON.parse(data["body"])["message"]);
  };

  // This function removes a group.
  const removegroup = async () => {
    // Call the REMOVEGROUP API gateway.
    try {
      const res = await fetch(
        "https://6ffo8aqo89.execute-api.us-east-1.amazonaws.com/notifyall/useraction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "REMOVEGROUP",
            username,
            groupname: selectedGroup,
          }),
        }
      );

      // Result received from the API.
      const data = await res.json();
      // Back to list of groups.
      resetSelectedGroup();
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // This function sends a message to a group.
  const sendMessage = async (event: FormEvent) => {
    event.preventDefault();

    // Call the SENDMESSAGE API gateway.
    try {
      const res = await fetch(
        "https://6ffo8aqo89.execute-api.us-east-1.amazonaws.com/notifyall/useraction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "SENDMESSAGE",
            username,
            groupname: selectedGroup,
            title: titleToSend,
            message: messageToSend,
          }),
        }
      );

      // Result received from the API.
      const data = await res.json();
      // Back to list of groups.
      resetSelectedGroup();
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // Reset forms and environment.
  function resetSelectedGroup() {
    setSelectedGroup("");
    setMembers([]);
    setAddmemberstatus("");
    setNewmembercontact("");
    setNewmembername("");
  }

  return (
    <div className="container-viewgroups">
      <Header></Header>
      <div className="view-lists">
        <ul className="groups-ul">
          {selectedGroup == "" && groups && (
            <div className="groups-list">
              <h1 className="groups-h1">View Groups</h1>
              {groups.length > 0 && <h3>Select a group to edit.</h3>}
              {groups.length == 0 && (
                <h3 className="groups-h3">
                  Looks like you have created no group.
                </h3>
              )}

              {groups.map((group, index) => (
                <li className="groups-li" key={index}>
                  <button
                    onClick={() => selectgroup(group)}
                    className="groups-button"
                  >
                    Edit or View: {group}
                  </button>
                </li>
              ))}
              <Link href="/creategroup" className="link-groups-creategroup">
                <button className="link-groups-button">
                  or create a new group here.{" "}
                </button>
              </Link>
            </div>
          )}
        </ul>
        {selectedGroup != "" && (
          <div className="members-list">
            <button
              onClick={() => resetSelectedGroup()}
              className="members-button"
            >
              Back
            </button>
            <h1 className="members-h1">{selectedGroup}</h1>
            {(addmemberstatus || addmemberstatus != "") && (
              <h3 className="members-h3">{addmemberstatus}</h3>
            )}

            <form onSubmit={sendMessage} className="members-form">
              <input
                className="members-input"
                value={titleToSend}
                onChange={(event) => setTitleToSend(event.target.value)}
                placeholder="Title"
              />
              <input
                className="members-input messagecontent"
                value={messageToSend}
                onChange={(event) => setMessageToSend(event.target.value)}
                placeholder="Message"
              />
              <button type="submit">Send!</button>
            </form>

            <h1 className="listofmembers-h1">List of Members</h1>
            {members.length == 0 && <>Group is empty!</>}
            {members.length > 0 &&
              members.map((member, index) => (
                <div key={member.contact} className="member-div">
                  Name: {member.membername}
                  <br />
                  Contact: {member.contact}
                  <br />
                  <button onClick={() => removemember(member.contact)}>
                    remove
                  </button>
                </div>
              ))}
            <form onSubmit={addmember}>
              <input
                className="members-input"
                value={newmembername}
                onChange={(event) => setNewmembername(event.target.value)}
                placeholder="Name"
              />
              <input
                className="members-input"
                value={newmembercontact}
                onChange={(event) => setNewmembercontact(event.target.value)}
                placeholder="Contact (e-mail)"
              />
              <button className="member-button" type="submit">
                Add!
              </button>
            </form>

            <button onClick={() => removegroup()} className="deletegroupbutton">
              Delete this group!
            </button>
          </div>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ViewLists;
