import React, { useState } from "react";
import initialTeams from "../data/teams.json";
import initialGroups from "../data/groups.json";

export default function TournamentBrackets() {
  const [teams] = useState(initialTeams);
  const [groups] = useState(initialGroups);
  const [selected, setSelected] = useState(null)

  const handleClick = (team) => {
    console.log(team.name)
  };
  const handleDrag = (selectedTeam) => {
    setSelected(selectedTeam)

  }

  const handleDrop = (e) => {
    console.log(selected)
    e.target.textContent = selected.name

  }



  return (
    <div className="bg-hero-pattern h-screen bg-center font-bold">
      <div className="container mx-auto">
        <div className="grid grid-cols-12 w-full h-3/4 pt-10 ">
          <div className="left-side col-span-2 space-y-10 ">
            {groups.map((group, index) => {
              if (group.side === "right") return false;
              return (
                <div
                  key={index}
                  className="border-2 group-box overflow-hidden col-span-1 shadow-md border-black text-center"
                >
                  <div key={index} className="bg-black text-white">
                    {group.name}
                  </div>

                  {teams.map((team) => {
                    /*eslint-disable-next-line*/
                    if (team.group !== group.name) return;
                    return (
                      <div
                        key={team.id}
                        onClick={() => handleClick(team)}
                        onDragStart={() => handleDrag(team)}
                        draggable
                        className="pt-1 cursor-pointer hover:opacity-70"
                      >
                        {team.name.toUpperCase()}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <div className="top16 col-span-1 text-center flex flex-col justify-around  ml-2">
            <div className="border -mt-4">
              <div className="p-1 bg-red-400" id="top16-a1" onDragEnter={() => console.log("girdi")} onDragLeave={handleDrop}>team1</div>
              <div className="p-1" id="top16-b2">team2</div>
            </div>
            <div><div>
              <div>team1</div>
              <div>team2</div>
            </div></div>
            <div><div>
              <div>team1</div>
              <div>team2</div>
            </div></div>
            <div><div>
              <div>team1</div>
              <div>team2</div>
            </div></div>
          </div>
          <div className="quarterFinal col-span-1 text-center flex flex-col justify-around">
            <div>
              <div>team1</div>
              <div>team2</div>
            </div>
            <div>
              <div>team1</div>
              <div>team2</div>
            </div>
          </div>
          <div className="semiFinal col-span-1 text-center flex flex-col justify-around">
            <div>
              <div>team1</div>
              <div>team2</div>
            </div>
          </div>
          <div className="final col-span-2 text-center flex flex-col justify-center">
            <div className="flex justify-center">
              <div>final1</div>
              <div>final2</div>
            </div>
          </div>
          <div className="semiFinal col-span-1 text-center flex flex-col justify-around">
            <div>
              <div>team1</div>
              <div>team2</div>
            </div>
          </div>
          <div className="quarterFinal col-span-1 text-center flex flex-col justify-around">
            <div>
              <div>team1</div>
              <div>team2</div>
            </div>
            <div>
              <div>team1</div>
              <div>team2</div>
            </div>
          </div>
          <div className="top16 col-span-1 text-center flex flex-col justify-around">
            <div>
              <div>team1</div>
              <div>team2</div>
            </div>
            <div><div>
              <div>team1</div>
              <div>team2</div>
            </div></div>
            <div><div>
              <div>team1</div>
              <div>team2</div>
            </div></div>
            <div><div>
              <div>team1</div>
              <div>team2</div>
            </div></div>
          </div>
          <div className="right-side col-span-2 space-y-10">
            {groups.map((group, index) => {
              if (group.side === "left") return false;
              return (
                <div
                  key={index}
                  className="border-2 group-box overflow-hidden col-span-1 shadow-md border-black text-center"
                >
                  <div key={index} className="bg-black text-white">
                    {group.name}
                  </div>

                  {teams.map((team) => {
                    /*eslint-disable-next-line*/
                    if (team.group !== group.name) return;
                    return (
                      <div
                        key={team.id}
                        onClick={() => handleClick(team)}
                        className="pt-1 cursor-pointer hover:opacity-70"
                      >
                        {team.name.toUpperCase()}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
