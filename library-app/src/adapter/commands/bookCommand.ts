import { AddBookUseCaseInterface } from "../../application/useCases/book/addBookUseCaseInterface";
import { AddBookRequestDto } from "../../application/dtos/book/addBookRequestDto";

export class BookCommand {
  constructor(private readonly addBookUseCase: AddBookUseCaseInterface) {}

  async addBook(title: string) {
    try {
      const requestDto: AddBookRequestDto = { title };
      const book = await this.addBookUseCase.execute(requestDto);

      console.log('書籍を登録しました');
      console.log(book);
    } catch (error) {
      console.log(error);
      console.log('書籍の登録に失敗しました');
    }
  }
}
