export const GET = async (req: Request, 
    context: { params: Promise<{ name: string }> }): Promise<Response> => {
    // get pokemon name from url
    const params = await context.params; // unwrap the promise
    const name = params.name;
    if (!name) {
      return Response.json({ error: "Missing name query param" }, { status: 400 });
    }

    // fetch the pokemon species from the pokeapi
    const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
    if (!speciesRes.ok) {
      return Response.json({ error: "Pokemon not found"}, { status: 404 });
    }
    const speciesData = await speciesRes.json();

    // get the evolution chain url
    const evoUrl = speciesData.evolution_chain.url;

    // fetch the evolution chain from the pokeapi
    const evoRes = await fetch(evoUrl);
    if (!evoRes.ok) {
      return Response.json({ error: "Pokemon not found"}, { status: 404 });
    }
    const evoData = await evoRes.json();
    
    let curr = evoData.chain;
    let nextEvolution: string | null = null;

    // loop until we find the Pokemon
    while (curr) {
      if (curr.species.name === name) {
        if (curr.evolves_to.length > 0) {
          nextEvolution = curr.evolves_to[0].species.name;
        }
        break; // found the Pokemon
      }

      // otherwise, check the next evolution branch
      if (curr.evolves_to.length > 0) {
        curr = curr.evolves_to[0];
      } else {
        curr = null; // reached the end without finding name
      }
    }

    if (nextEvolution === null) {
        nextEvolution = name;
    }

    const result = {
      name: name,
      evolution: nextEvolution
    };

    return Response.json(result, { status: 200 });
};