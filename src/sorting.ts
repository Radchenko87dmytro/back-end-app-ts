let users = [
  { id: "dsdf2-sdfs23", name: "dima", age: 34 },
  { id: "dsdf2-sdfs24", name: "ivon", age: 35 },
  { id: "dsdf2-sdfs25", name: "ignat", age: 32 },
  { id: "dsdf2-sdfs26", name: "artem", age: 44 },
  { id: "dsdf2-sdfs26", name: "artem", age: 44 },
  { id: "dsdf2-sdfs26", name: "artem", age: 44 },
  { id: "dsdf2-sdfs26", name: "artem2", age: 25 },
];

users.push({ id: "qsdf2-sdfs-23", name: "kola", age: 22 });

type SortedBy<T> = {
  fieldName: keyof T;
  direction: "asc" | "desc";
};

const getSortedItems = <T>(items: T[], ...sortBy: SortedBy<T>[]) => {
  return [...items].sort((u1, u2) => {
    //asc sort by age
    // if (u1.age < u2.age) return -1;
    // if (u1.age > u2.age) return 1;
    // return 0;

    //asc sort by name and desc by age
    // if (u1.name < u2.name) return -1;
    // if (u1.name > u2.name) return 1;

    // if (u1.age < u2.age) return 1;
    // if (u1.age > u2.age) return -1;
    // return 0;

    for (let sortConfig of sortBy) {
      if (u1[sortConfig.fieldName] < u2[sortConfig.fieldName]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (u1[sortConfig.fieldName] > u2[sortConfig.fieldName]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
    }

    return 0;
  });
};

//console.log(getUsers());
console.log(
  getSortedItems(
    users,
    { fieldName: "name", direction: "asc" },
    { fieldName: "age", direction: "desc" },
    { fieldName: "id", direction: "asc" }
  )
);
