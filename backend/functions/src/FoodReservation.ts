import * as t from 'io-ts'
import * as Either from 'fp-ts/lib/Either'
import { PathReporter } from 'io-ts/lib/PathReporter'

type FoodModel = t.TypeOf<typeof FoodModel>

export function decodeFoodModel(data: any): FoodModel {
  const decoded = FoodModel.decode(data)
  return Either.fold(
    () => {
      throw new Error(
        `Validation error:\n` + PathReporter.report(decoded).join('\n'),
      )
    },
    (food: FoodModel) => {
      return food
    },
  )(decoded)
}

export async function importFood(env: string, model: FoodModel) {
  console.log('meow')
}

// Type definitions
export const CustomizationChoice = t.intersection(
  [
    t.type({
      id: t.string,
      title: t.string,
    }),
    t.partial({
      info: t.string,
      availability: t.number,
    }),
  ],
  'CustomizationChoice',
)

export const Customization = t.intersection(
  [
    t.type({
      id: t.string,
      title: t.string,
      choices: t.array(CustomizationChoice),
    }),
    t.partial({
      allowedChoices: t.number,
    }),
  ],
  'Customization',
)

export const Restaurant = t.intersection(
  [
    t.type({
      id: t.string,
      title: t.string,
      customizations: t.array(Customization),
    }),
    t.partial({
      availability: t.number,
      info: t.string,
    }),
  ],
  'Restaurant',
)

export const Group = t.type(
  {
    title: t.string,
    choices: t.array(Restaurant),
  },
  'Group',
)

export const FoodModel = t.type(
  {
    groups: t.array(Group),
  },
  'FoodModel',
)
