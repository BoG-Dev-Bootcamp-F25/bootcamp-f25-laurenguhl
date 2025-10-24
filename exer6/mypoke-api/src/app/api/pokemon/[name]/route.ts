export const GET = async (req: Request, 
    context: { params: Promise<{ name: string }> }): Promise<Response> => {
    // get pokemon name from url
    const params = await context.params; // unwrap the promise
    const name = params.name;
    if (!name) {
      return Response.json({ error: "Missing name query param" }, { status: 400 });
    }

    // fetch this pokemon from the pokeapi
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!res.ok) {
      return Response.json({ error: "Pokemon not found"}, { status: 404 });
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