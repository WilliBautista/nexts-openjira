interface seedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createAt: number;
}

export const seedData: seedData = {
  entries: [
    {
      description: 'Jira board "demo" build with Nextjs, typescript and MongoDB',
      status: 'pending',
      createAt: Date.now()
    },
    {
      description: 'You can Drag and Drop the cards between columns',
      status: 'in-progress',
      createAt: Date.now() - 1000000
    },
    {
      description: 'You can create, update and delete any entry',
      status: 'done',
      createAt: Date.now() - 100000
    },
  ]
}
