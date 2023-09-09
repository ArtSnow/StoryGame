import pymorphy3
import json
import random
from deep_translator import GoogleTranslator


def main():
    morph = pymorphy3.MorphAnalyzer()

    first_part = ''
    second_part = ''
    third_part = ''
    zero_part = 'Призыв:' if random.randint(0,1) == 0 else 'Заклинание:'
    print(zero_part)
    first_choice = []
    second_choice = []
    third_choice = []
    with open('П.txt', 'r', encoding='utf-8') as file:
        words = file.readlines()
        first_choice = [words[random.randint(0, len(words)-1)].strip().capitalize() for x in range(3)]

    print(first_choice)
    first_part = first_choice[int(input()) - 1]

    with open('С.txt', 'r', encoding='utf-8') as file:
        words = file.readlines()
        second_choice = [words[random.randint(0, len(words)-1)].strip().capitalize() for x in range(3)]

    print(second_choice)
    second_part = second_choice[int(input()) - 1]
    second_part_gender = morph.parse(second_part)[0].tag.gender
    morph2 = morph.parse(first_part)[0]
    try:
        first_part = morph2.inflect({second_part_gender}).word.capitalize()
    except:
        pass
    # if second_part_gender != 'masc':
    #     first_part = first_part[:-2] + genders[second_part_gender]


    with open('П.txt', 'r', encoding='utf-8') as file1, open('С.txt', 'r', encoding='utf-8') as file2:
        words1 = file1.readlines()
        words2 = file2.readlines()
        for i in range(3):
            word3 = words1[random.randint(0, len(words1)-1)].strip().capitalize()
            word4 = words2[random.randint(0, len(words2)-1)].strip().capitalize()
            word4_gender = morph.parse(word4)[0].tag.gender
            morph4 = morph.parse(word4)[0]
            morph3 = morph.parse(word3)[0]
            try:
                word3 = morph3.inflect({word4_gender, 'gent'}).word
            except:
                pass
            #word3 = word3[:-2] + ('ой' if word4_gender == 'femn' else 'ого')
            word4 = morph4.inflect({'gent'})
            third_choice.append(word3 + ' ' + word4.word)

    print(third_choice)

    third_part = third_choice[int(input()) - 1]

    print(zero_part, first_part.lower(), second_part.lower(), third_part.lower())
    



    
    
    



    # with open('newP.txt', 'w', encoding='utf-8') as f:
    #     with open('П.txt', 'r', encoding='utf-8') as f2:
    #         sorty = sorted(list(set(f2.readlines())))
    #         for s in sorty:
    #             f.write(s)




if __name__ == "__main__":
    main()