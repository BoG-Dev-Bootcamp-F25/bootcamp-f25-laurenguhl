export const GET = async (req: Request): Promise<Response> => {
    // get id between 1 and 1025
    const id = Math.floor(Math.random() * 1025) + 1;

    // fetch this pokemon from the pokeapi
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!res.ok) {
      return Response.json(res.body, { status: res.status });
    }
    const data = await res.json();

    // get the necessary fields
    const pokemon = {
      name: data.name,
      sprite: data.sprites.front_default,
      types: data.types.map((t: any) => t.type.name),
    };

    // Return JSON with status 200
    return Response.json(pokemon, { status: 200 });
};