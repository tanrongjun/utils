type Animal = {
  name: string;
  category: string;
  age: number;
  eat: () => number;
  gender: string;
}

// Partial<T>: 将泛型中全部属性变为可选的
type PartOfAnimal = Partial<Animal>;
const p: PartOfAnimal = {
  name: 'zs'
}

// Record<T, K>: 遍历T，将拿到的子类型设置为K
/**
 * type Eg1 = {
 *   a: { key1: string; };
 *   b: { key1: string; };
 * }
 * @desc 就是遍历第一个参数'a' | 'b'的每个子类型，然后将值设置为第二参数
 */
type Eg1 = Record<'a' | 'b', { key1: string }>

// Pick<T, K>: 将 T 类型中的 K 键列表提取出来，生成新的子键值对类型
const bird: Pick<Animal, "name" | "age"> = { name: 'bird', age: 1 }

// Exclude<T, U>: 提取存在于T，但不存在于U的类型组成的联合类型
// type Eg2 = 'key1'
type Eg2 = Exclude<'key1' | 'key2', 'key2'>

// Extract<T, U>: 提取联合类型T和联合类型U的所有交集
// type Eg3 = 'key1'
type Eg3 = Extract<'key1' | 'key2', 'key1'>

// Omit<T, K>: 先从 T 中剔除 K 中属性
const OmitAnimal: Omit<Animal, 'name' | 'age'> = { category: 'lion', eat: () => 11, gender: 'male' }

// Required<T>: 将泛型中全部属性变为必选的
const RequiredAnimal: Required<Animal> = {
  name: 'zs',
  age: 11,
  gender: 'male',
  eat: () => 111,
  category: '行业'
}
