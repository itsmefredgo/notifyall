import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../../assets/includes/header";
import Footer from "../../assets/includes/footer";
import CreateGroupForm from "./createGroupForm"

const CreateGroup = () => {
  const [groups, setGroups] = useState<string[]>([]);
  const [username, setUsername] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<string>("");

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
        console.log(data["body"]);
        setGroups(JSON.parse(data["body"]));
      }
    };

    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
      fetchGroups();
    }
  }, [username]);

  return (
    <div>
      <Header></Header>
      <CreateGroupForm></CreateGroupForm>
      <Footer></Footer>
    </div>
  );
};

export default CreateGroup;
