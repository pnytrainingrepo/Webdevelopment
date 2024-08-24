export async function generateStaticParams() {
    const names: string[] = ["Azam", "Tahir", "Aqib", "Moeez"];
  
    return names.map((name) => ({
      name: name,
    }));
  }


export default function GiveName({ params, searchParams }: {
    params: { name: string },
    searchParams: { id: string },
  }) {
    
      return (
        <div>
              My name is {params.name}.
        </div>
        
      )
    }