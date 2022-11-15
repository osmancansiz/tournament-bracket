import React, { useEffect, useState } from "react";

export default function TournamentBrackets() {
  const [teams] = useState([
    {
      id: 1,
      name: "Katar",
      side: "left",
      group: "A",
      rank: 0,
      status: "top_32",
    },
    {
      id: 2,
      name: "Ekvador",
      side: "left",
      group: "A",
      rank: 0,
      status: "top_32",
    },
    {
      id: 3,
      name: "Senegal",
      side: "left",
      group: "A",
      rank: 0,
      status: "top_32",
    },
    {
      id: 4,
      name: "Hollanda",
      side: "left",
      group: "A",
      rank: 0,
      status: "top_32",
    },
    {
      id: 5,
      name: "İngiltere",
      side: "right",
      group: "B",
      rank: 0,
      status: "top_32",
    },
    {
      id: 6,
      name: "İran",
      side: "right",
      group: "B",
      rank: 0,
      status: "top_32",
    },
    {
      id: 7,
      name: "ABD",
      side: "right",
      group: "B",
      rank: 0,
      status: "top_32",
    },
    {
      id: 8,
      name: "Galler",
      side: "right",
      group: "B",
      rank: 0,
      status: "top_32",
    },
    {
      id: 9,
      name: "Arjantin",
      side: "left",
      group: "C",
      rank: 0,
      status: "top_32",
    },
    {
      id: 10,
      name: "Suudi Arabistan",
      side: "left",
      group: "C",
      rank: 0,
      status: "top_32",
    },
    {
      id: 11,
      name: "Meksika",
      side: "left",
      group: "C",
      rank: 0,
      status: "top_32",
    },
    {
      id: 12,
      name: "Polonya",
      side: "left",
      group: "C",
      rank: 0,
      status: "top_32",
    },
    {
      id: 13,
      name: "Fransa",
      side: "right",
      group: "D",
      rank: 0,
      status: "top_32",
    },
    {
      id: 14,
      name: "Avustralya",
      side: "right",
      group: "D",
      rank: 0,
      status: "top_32",
    },
    {
      id: 15,
      name: "Danimarka",
      side: "right",
      group: "D",
      rank: 0,
      status: "top_32",
    },
    {
      id: 16,
      name: "Tunus",
      side: "right",
      group: "D",
      rank: 0,
      status: "top_32",
    },
    {
      id: 17,
      name: "İspanya",
      side: "left",
      group: "E",
      rank: 0,
      status: "top_32",
    },
    {
      id: 18,
      name: "Kosta Rika",
      side: "left",
      group: "E",
      rank: 0,
      status: "top_32",
    },
    {
      id: 19,
      name: "Almanya",
      side: "left",
      group: "E",
      rank: 0,
      status: "top_32",
    },
    {
      id: 20,
      name: "Japonya",
      side: "left",
      group: "E",
      rank: 0,
      status: "top_32",
    },
    {
      id: 21,
      name: "Belçika",
      side: "right",
      group: "F",
      rank: 0,
      status: "top_32",
    },
    {
      id: 22,
      name: "Kanada",
      side: "right",
      group: "F",
      rank: 0,
      status: "top_32",
    },
    {
      id: 23,
      name: "Fas",
      side: "right",
      group: "F",
      rank: 0,
      status: "top_32",
    },
    {
      id: 24,
      name: "Hırvatistan",
      side: "right",
      group: "F",
      rank: 0,
      status: "top_32",
    },
    {
      id: 25,
      name: "Brezilya",
      side: "left",
      group: "G",
      rank: 0,
      status: "top_32",
    },
    {
      id: 26,
      name: "Sırbistan",
      side: "left",
      group: "G",
      rank: 0,
      status: "top_32",
    },
    {
      id: 27,
      name: "İsviçre",
      side: "left",
      group: "G",
      rank: 0,
      status: "top_32",
    },
    {
      id: 28,
      name: "Kamerun",
      side: "left",
      group: "G",
      rank: 0,
      status: "top_32",
    },
    {
      id: 29,
      name: "Portekiz",
      side: "right",
      group: "H",
      rank: 0,
      status: "top_32",
    },
    {
      id: 30,
      name: "Gana",
      side: "right",
      group: "H",
      rank: 0,
      status: "top_32",
    },
    {
      id: 31,
      name: "Uruguay",
      side: "right",
      group: "H",
      rank: 0,
      status: "top_32",
    },
    {
      id: 32,
      name: "Güney Kore",
      side: "right",
      group: "H",
      rank: 0,
      status: "top_32",
    },
  ]);
  const [winnersLeft, setWinnersLeft] = useState([]);
  const [winnersRight, setWinnersRight] = useState([]);
  const [groups, setGroups] = useState([]);

  const handleWinner = (team) => {
    if (team.side === "left") setWinnersLeft([...winnersLeft, team]);
    else setWinnersRight([...winnersRight, team]);
  };

  useEffect(() => {
    const groups = [];
    teams.forEach((team) => {
      if (groups.includes(team.group)) return;
      groups.push(team.group);
    });
    setGroups([...groups]);
  }, [teams]);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2">
        {groups.map((group, index) => (
          <div key={index}>
            <div key={index}>{group}</div>
            {teams.map((team) => {
              /*eslint-disable-next-line*/
              if (team.group !== group) return;
              return (
                <div key={team.id} onClick={() => handleWinner(team)}>
                  {team.name}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
