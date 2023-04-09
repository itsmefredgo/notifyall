import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import Header from "../../assets/includes/header";
import Footer from "../../assets/includes/footer";
import { group } from "console";
import { useRouter } from "next/router";

import { translateMessage } from "../../assets/translate";

interface Member {
  membername: string;
  contact: string;
  language: string;
}

function convertToList(members: Record<string, Member>): Member[] {
  const memberList: Member[] = [];
  for (const [key, value] of Object.entries(members)) {
    const { membername, contact, language } = value;
    memberList.push({ membername, contact, language });
  }
  memberList.reverse();
  memberList.pop();
  memberList.reverse();
  return memberList;
}

const ViewLists = () => {
  const router = useRouter();

  const [groups, setGroups] = useState<string[]>([]);
  const [username, setUsername] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [members, setMembers] = useState<Member[]>([]);

  const [newmembername, setNewmembername] = useState<string>("");
  const [newmembercontact, setNewmembercontact] = useState<string>("");
  const [newmemberlanguage, setNewmemberlanguage] = useState<string>("English");

  const [addmemberstatus, setAddmemberstatus] = useState<string>();

  // ================================================================================================
  useEffect(() => {
    const fetchGroups = async () => {
      const res = await fetch(
        "https://zhwuzz7e9e.execute-api.us-east-1.amazonaws.com/test/retrievelists",
        {
          method: "POST",
          body: JSON.stringify({ username }),
        }
      );
      const data = await res.json();
      if (data["body"]) {
        setGroups(JSON.parse(data["body"]));
      }
    };

    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
      fetchGroups();
    }
  }, [username]);
  // ================================================================================================
  function selectgroup(selectedgroupname: string) {
    setSelectedGroup(selectedgroupname);
    fetchContact(selectedgroupname);
  }
  // ================================================================================================
  const fetchContact = async (selectedGroup: string) => {
    const res = await fetch(
      "https://zhwuzz7e9e.execute-api.us-east-1.amazonaws.com/test/retrievemembers",
      {
        method: "POST",
        body: JSON.stringify({ username, groupname: selectedGroup }),
      }
    );
    const data = await res.json();

    if (data["body"]) {
      // console.log(JSON.parse(data["body"]));
      // if (data["body"]["message"] != null) {
      setMembers(convertToList(JSON.parse(data["body"])));

      // }
    }
  };
  // ================================================================================================
  const addmember = async (event: FormEvent) => {
    event.preventDefault();

    const res = await fetch(
      "https://zhwuzz7e9e.execute-api.us-east-1.amazonaws.com/test/addmember",
      {
        method: "POST",
        body: JSON.stringify({
          username,
          groupname: selectedGroup,
          membername: newmembername,
          contact: newmembercontact,
          language: newmemberlanguage,
        }),
      }
    );
    const data = await res.json();
    fetchContact(selectedGroup);
    console.log(data);
    setAddmemberstatus(JSON.parse(data["body"])["message"]);

    if (JSON.parse(data["body"])["message"] == "Member added successfully") {
      setNewmembercontact("");
      setNewmemberlanguage("English");
      setNewmembername("");
    }

    const translatedMessage = await translateMessage("Hello world!", "fr"); // Translate "Hello world!" to French

    console.log(translatedMessage); // Output: "Bonjour le monde !"
  };
  // ================================================================================================
  const removemember = async (membercontacttoremove: string) => {
    const res = await fetch(
      "https://zhwuzz7e9e.execute-api.us-east-1.amazonaws.com/test/removemember",
      {
        method: "POST",
        body: JSON.stringify({
          username,
          groupname: selectedGroup,
          contact: membercontacttoremove,
        }),
      }
    );
    const data = await res.json();
    fetchContact(selectedGroup);
    setAddmemberstatus(JSON.parse(data["body"])["message"]);
  };
  // ================================================================================================
  const removegroup = async () => {
    const res = await fetch(
      "https://zhwuzz7e9e.execute-api.us-east-1.amazonaws.com/test/removegroup",
      {
        method: "POST",
        body: JSON.stringify({
          username,
          groupname: selectedGroup,
        }),
      }
    );
    const data = await res.json();
    resetSelectedGroup();
    router.reload();
  };
  // ================================================================================================
  function resetSelectedGroup() {
    setSelectedGroup("");
    setMembers([]);
    setAddmemberstatus("");
    setNewmembercontact("");
    setNewmemberlanguage("English");
    setNewmembername("");
  }

  return (
    <div>
      <Header></Header>
      <div className="view-lists">
        <Link className="gobackfromlogin" href="/">
          Back to main page
        </Link>

        <ul>
          {selectedGroup == "" && groups && (
            <div className="groups-list">
              <h1>View Groups</h1>
              {groups.length > 0 && <h3>Select a group to edit.</h3>}
              {groups.length == 0 && (
                <h3>Looks like you have created no group.</h3>
              )}

              {groups.map((group, index) => (
                <li key={index}>
                  <button onClick={() => selectgroup(group)}>
                    Edit or View: {group}
                  </button>
                </li>
              ))}
              <Link href="/creategroup" className="link-groups-creategroup">
                <button>or create a new group here. </button>
              </Link>
            </div>
          )}
        </ul>
        {selectedGroup != "" && (
          <div className="members-list">
            <button onClick={() => resetSelectedGroup()}>Back</button>
            <h1>{selectedGroup}</h1>
            {(addmemberstatus || addmemberstatus != "") && (
              <h3>{addmemberstatus}</h3>
            )}
            {members.length == 0 && <>Group is empty!</>}
            {members.length > 0 &&
              members.map((member, index) => (
                <div key={member.contact}>
                  Name: {member.membername}
                  <br />
                  Contact: {member.contact}
                  <br />
                  Language: {member.language}
                  <br />
                  <button onClick={() => removemember(member.contact)}>
                    remove
                  </button>
                </div>
              ))}
            <form onSubmit={addmember}>
              <input
                value={newmembername}
                onChange={(event) => setNewmembername(event.target.value)}
                placeholder="Name"
              />
              <input
                value={newmembercontact}
                onChange={(event) => setNewmembercontact(event.target.value)}
                placeholder="Contact (e-mail)"
              />
              <input
                value={newmemberlanguage}
                onChange={(event) => setNewmemberlanguage(event.target.value)}
                placeholder="Language"
              />
              <button type="submit">Add!</button>
            </form>
            <button onClick={() => removegroup()}>Delete this group!</button>
          </div>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ViewLists;
