import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/reducers';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { ingredients, ingredientsRequest } = useSelector(
    (state: RootState) => state.ingredients
  );

  const ingredientData = ingredients.find((item) => item._id === id);

  if (ingredientsRequest || !ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
