export const POST = async (req: Request): Promise<Response> => {
    
    const body = await req.json();
    const { pokemon1, pokemon2 } = body;

    if (!pokemon1 || !pokemon2) {
      return Response.json(
        { error: "Missing pokemon1 or pokemon2 in request body" },
        { status: 400 }
      );
    }

    // fetch info about both pokemon
    const [res1, res2] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon1}`),
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon2}`)
    ]);

    if (!res1.ok || !res2.ok) {
      return Response.json(
        { error: "One or both Pokemon not found" },
        { status: 404 }
      );
    }

    const [data1, data2] = await Promise.all([res1.json(), res2.json()]);

    // sum up base stats for both pokemon
    const total1 = data1.stats.reduce((sum: number, stat: any) => sum + stat.base_stat, 0);
    const total2 = data2.stats.reduce((sum: number, stat: any) => sum + stat.base_stat, 0);

    // decide winner
    let winner_poke: string;
    if (total1 > total2) {
        winner_poke = data1.name;
    } else if (total2 > total1) {
        winner_poke = data2.name;
    } else {
        winner_poke = "tie";
    }

    return Response.json({ winner: winner_poke}, { status: 200 });
};