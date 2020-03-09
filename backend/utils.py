from flask import request
from generate import *


def __validate_length(length):
    if length is None or length == '':
        raise ValueError('Input can not be empty!')
    try:
        int(length)
    except TypeError:
        raise ValueError('Input Length should be number!')


def __validate_input(prefix, length, mode, rhyme_pattern):
    if prefix is None or prefix == '':
        raise ValueError('Prefix can not be empty!')
    __validate_length(length)
    if mode is None or mode == '':
        raise ValueError('Mode can not be empty!')
    if mode == 'Rhyme' and len(rhyme_pattern) != int(length):
        raise ValueError('The length of rhyme pattern should be equal to the length of generated lyrics!')


def __get_inputs():
    prefix = request.json.get('prefix')
    length = request.json.get('length')
    mode = request.json.get('mode')
    rhyme_pattern = request.json.get('rhyme_pattern')
    __validate_input(prefix, length, mode, rhyme_pattern)
    return prefix, length, mode, rhyme_pattern


def predict():
    prefix, length, mode, rhyme_pattern = __get_inputs()
    if mode == 'Lucky' or rhyme_pattern == '':
        lucky_mode = True
        rhyme_pattern = ''
    else:
        lucky_mode = False
    generated_lyrics = main(length, prefix, lucky_mode, rhyme_pattern)
    return generated_lyrics
