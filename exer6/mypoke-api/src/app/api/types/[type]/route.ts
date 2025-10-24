export const GET = async (req: Request, 
    context: { params: Promise<{ type: string }> }): Promise<Response> => {
    // get type from url
    const params = await context.params; // unwrap the promise
    const type = params.type;
    if (!type) {
      return Response.json({ error: "Missing type query param" }, { status: 400 });
    }

    // fetch this type from the pokeapi
    const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    if (!res.ok) {
      return Response.json({ error: "Type not found"}, { status: 404 });
    }
    const data = await res.json();

    // get the necessary fields
    const type_list = {
      type: type,
      pokemon: data.pokemon.map((p: any) => p.pokemon.name),
    };

    // Return JSON with status 200
    return Response.json(type_list, { status: 200 });
};