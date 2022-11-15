import React, { useEffect, useState } from "react";
import data from "../data.json";

export default function TournamentBrackets() {
  const [teams, setTeams] = useState(data);
  const [groups, setGroups] = useState([]);

  const handleClick = (team) => {
    if (team.rank !== 0) return;
    const teamsClone = teams;
    let highestRank = calculateHighestRankByGroup(team.group);

    const index = teams.findIndex((i) => i === team);
    if (highestRank > 4) return;
    teamsClone[index].rank = ++highestRank;

    if (highestRank <= 2)
      teamsClone[index].status = `${teamsClone[index].status.slice(0, 3)}${Number(teamsClone[index].status.slice(-2)) / 2
        }`;

    setTeams([...teamsClone]);
  };

  const calculateHighestRankByGroup = (group) => {
    const filteredGroup = teams.filter((i) => i.group === group);
    return Math.max(...filteredGroup.map((i) => i.rank));
  };

  useEffect(() => {
    const groups = [];
    teams.forEach((team) => {
      if (groups.includes(team.group)) return;
      groups.push(team.group);
    });
    setGroups([...groups]);
    //eslint-disable-next-line
  }, []);

  return (
    <div className="bg-hero-pattern h-screen bg-center font-bold">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-10 place-items-center h-3/4 pt-4">
          {groups.map((group, index) => (
            <div key={index} className="border  border-black w-[250px] text-center">
              <div key={index} className="bg-black text-white">
                {group}
              </div>
              {teams.map((team) => {
                /*eslint-disable-next-line*/
                if (team.group !== group) return;
                return (
                  <div key={team.id} onClick={() => handleClick(team)}>
                    {team.name.toUpperCase()}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
