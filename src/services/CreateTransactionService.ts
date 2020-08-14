// import AppError from '../errors/AppError';
import { getCustomRepository, getRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    type,
    value,
    category,
  }: Request): Promise<Transaction> {
    if (type !== 'income' && type !== 'outcome') {
      throw Error('Type is incorrect');
    }
    console.log(category);
    if (category) {
      console.log(
        'Existe algo no category_id, fazer a lógica para verificar se já existe no banco',
      );
      const categoryRepository = getRepository(Category);
      /*
      const checkCategoryExists = await categoryRepository.findOne({
        where: category,
      });
      if (!checkCategoryExists) {
        const categoryCreated = categoryRepository.create({
          title: category,
        });
        await categoryRepository.save(categoryCreated);
        //category = categoryCreated.id;
      }
*/
    }
    console.log('Inserir na base de dados');
    const transactionRepository = getCustomRepository(TransactionsRepository);
    const transaction = transactionRepository.create({
      title,
      type,
      value,
      //     category_id: category,
    });
    await transactionRepository.save(transaction);
    return transaction;
  }
}

export default CreateTransactionService;
