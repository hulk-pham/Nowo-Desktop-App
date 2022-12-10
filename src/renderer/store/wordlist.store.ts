import dictionaryService from 'renderer/services/dictionany.service';
import { Word } from 'renderer/types/Word.type';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import useToastStore from './toast.store';

export interface WordlistState {
  words: Word[];
  fetchAndAdd: (text: string, id: number) => void;
  addWord: (newWord: Word) => void;
  editWord: (wordId: number, wordData: Word) => void;
  removeWord: (id: number) => void;
  removeAllWord: () => void;
}

const useWordlistStore = create<WordlistState>()(
  persist(
    (set) => ({
      words: [],
      fetchAndAdd: async (text: string, id: number) => {
        try {
          const wordData = await dictionaryService.getDefinition(text);

          const engDefine =
            wordData?.[0]?.meanings?.[0]?.definitions?.[0]?.definition;
          const phoneticHasVideo = wordData?.[0]?.phonetics?.find(
            (e: any) => e.audio
          );
          const phonetic = phoneticHasVideo || wordData?.[0]?.phonetics?.[0];
          const newWord: Word = {
            id,
            text,
            engDefine,
            phonetic: phonetic.text,
            audio: phonetic.audio,
          };
          set((state: WordlistState) => ({
            ...state,
            words: [newWord, ...state.words],
          }));
        } catch (error) {
          useToastStore.setState({
            toastData: {
              title: (error as any).response?.data?.title,
              description: (error as any).response?.data?.message,
              status: 'error',
            },
          });
        }
      },
      addWord: (newWord: Word) =>
        set((state: WordlistState) => ({
          ...state,
          words: [newWord, ...state.words],
        })),
      editWord: (wordId: number, wordData: Word) =>
        set((state: WordlistState) => {
          const index = (state.words as Word[])
            .map((word) => word.id)
            .indexOf(wordId);
          const cloneWords = [...state.words];
          cloneWords[index] = wordData;
          return { ...state, words: cloneWords };
        }),
      removeWord: (id: number) =>
        set((state: WordlistState) => ({
          ...state,
          words: state.words.filter((item: Word) => item.id !== id),
        })),
      removeAllWord: () => set({ words: [] }),
    }),
    {
      name: 'words-storage',
    }
  )
);

export default useWordlistStore;
