import React, { useState } from "react";
import initialTeams from "../data/teams.json";
import initialGroups from "../data/groups.json";

export default function TournamentBrackets() {
  const [teams] = useState(initialTeams);
  const [groups] = useState(initialGroups);
  const [selectedTeams, setSelectedTeams] = useState([]);

  const handleClick = (team) => {
    if (selectedTeams.findIndex((i) => i.id === team.id) !== -1) return;
    const groupMember = selectedTeams.filter((i) => i.group === team.group);

    if (groupMember.length === 0) {
      team.rank += 1;
      setSelectedTeams([...selectedTeams, team]);
    } else if (groupMember.length === 1) {
      team.rank = groupMember[0].rank + 1;
      setSelectedTeams([...selectedTeams, team]);
    }
  };

  return (
    <div className="bg-hero-pattern h-screen bg-center font-bold">
      <div className="container mx-auto">
        <div className="grid grid-cols-12 w-full h-3/4 pt-10 ">
          <div className="col-span-2 space-y-10 ">
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
          <div className="col-span-1 space-y-16">
            <div className="bg-lime-500 w-32 h-20">
              {selectedTeams
                .filter((i) => i.group === "A" && i.rank === 1)
                .map((team) => (
                  <div>{team.name}</div>
                ))}
              {selectedTeams
                .filter((i) => i.group === "B" && i.rank === 2)
                .map((team) => (
                  <div>{team.name}</div>
                ))}
            </div>

            <div className="bg-lime-500 w-32 h-20">
              {selectedTeams
                .filter((i) => i.group === "C" && i.rank === 1)
                .map((team) => (
                  <div>{team.name}</div>
                ))}
              {selectedTeams
                .filter((i) => i.group === "D" && i.rank === 2)
                .map((team) => (
                  <div>{team.name}</div>
                ))}
            </div>

            <div className="bg-lime-500 w-32 h-20">
              {selectedTeams
                .filter((i) => i.group === "E" && i.rank === 1)
                .map((team) => (
                  <div>{team.name}</div>
                ))}
              {selectedTeams
                .filter((i) => i.group === "F" && i.rank === 2)
                .map((team) => (
                  <div>{team.name}</div>
                ))}
            </div>

            <div className="bg-lime-500 w-32 h-20">
              {selectedTeams
                .filter((i) => i.group === "G" && i.rank === 1)
                .map((team) => (
                  <div>{team.name}</div>
                ))}
              {selectedTeams
                .filter((i) => i.group === "H" && i.rank === 2)
                .map((team) => (
                  <div>{team.name}</div>
                ))}
            </div>
          </div>
          <div className="col-span-6"></div>
          <div className="col-span-1 space-y-16">
            <div className="bg-lime-500 w-32 h-20">
              {selectedTeams
                .filter((i) => i.group === "B" && i.rank === 1)
                .map((team) => (
                  <div>{team.name}</div>
                ))}
              {selectedTeams
                .filter((i) => i.group === "A" && i.rank === 2)
                .map((team) => (
                  <div>{team.name}</div>
                ))}
            </div>

            <div className="bg-lime-500 w-32 h-20">
              {selectedTeams
                .filter((i) => i.group === "D" && i.rank === 1)
                .map((team) => (
                  <div>{team.name}</div>
                ))}
              {selectedTeams
                .filter((i) => i.group === "C" && i.rank === 2)
                .map((team) => (
                  <div>{team.name}</div>
                ))}
            </div>

            <div className="bg-lime-500 w-32 h-20">
              {selectedTeams
                .filter((i) => i.group === "F" && i.rank === 1)
                .map((team) => (
                  <div>{team.name}</div>
                ))}
              {selectedTeams
                .filter((i) => i.group === "E" && i.rank === 2)
                .map((team) => (
                  <div>{team.name}</div>
                ))}
            </div>

            <div className="bg-lime-500 w-32 h-20">
              {selectedTeams
                .filter((i) => i.group === "H" && i.rank === 1)
                .map((team) => (
                  <div>{team.name}</div>
                ))}
              {selectedTeams
                .filter((i) => i.group === "G" && i.rank === 2)
                .map((team) => (
                  <div>{team.name}</div>
                ))}
            </div>
          </div>
          <div className="col-span-2 space-y-10">
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
