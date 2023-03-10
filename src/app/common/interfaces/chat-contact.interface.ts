export interface IChatContact {

  data?: {
    users: [{
      id: number,
      email: string,
      username: string,
      firstName: string,
      lastName: string,
      image: string,
      gender: number,
      birthday: string,
      country: string,
      city: string,
      address: string,
      phone: string,
      group: string,
      lastChat?: { date: Date },
    }],
    groups: [{
      id: number,
      name: string,
      description: string,
      lastChat?: { date: Date },
    }]
  };
}
