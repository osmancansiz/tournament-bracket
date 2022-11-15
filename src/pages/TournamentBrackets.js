import React, { useEffect, useState } from "react";
import data from "../data.json";

export default function TournamentBrackets() {
  const [teams, setTeams] = useState(data);
  const [groups, setGroups] = useState([]);

  const handleClick = (team) => {
    if (team.rank !== 0) return;
    const teamsClone = teams;
    let highestRank = Math.max(...teamsClone.map((i) => i.rank));
    const index = teams.findIndex((i) => i === team);
    if (highestRank > 4) return;
    teamsClone[index].rank = ++highestRank;
    setTeams([...teamsClone]);
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
    <div className="bg-hero-pattern h-screen bg-center">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-5">
          {groups.map((group, index) => (
            <div key={index} className='border w-[150px] text-center'>
              <div key={index} className='bg-red-400'>{group}</div>
              {teams.map((team) => {
                /*eslint-disable-next-line*/
                if (team.group !== group) return;
                return (
                  <div key={team.id} onClick={() => handleClick(team)}>
                    {team.name}
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
