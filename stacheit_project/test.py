#!/usr/bin/env python

#	Copyright 2013 AlchemyAPI
#
#   Licensed under the Apache License, Version 2.0 (the "License");
#   you may not use this file except in compliance with the License.
#   You may obtain a copy of the License at
#
#       http://www.apache.org/licenses/LICENSE-2.0
#
#   Unless required by applicable law or agreed to in writing, software
#   distributed under the License is distributed on an "AS IS" BASIS,
#   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#   See the License for the specific language governing permissions and
#   limitations under the License.


from __future__ import print_function
from alchemyapi import AlchemyAPI
import json


demo_text = 'Yesterday dumb Bob destroyed my fancy iPhone in beautiful Denver, Colorado. I guess I will have to head over to the Apple Store and buy a new one.'
demo_url = 'http://en.wikipedia.org/wiki/Squirrel'
demo_html = '<html><head><title>Python Demo | AlchemyAPI</title></head><body><h1>Did you know that AlchemyAPI works on HTML?</h1><p>Well, you do now.</p></body></html>'


print('')
print('')
print('            ,                                                                                                                              ') 
print('      .I7777~                                                                                                                              ')
print('     .I7777777                                                                                                                             ')
print('   +.  77777777                                                                                                                            ')
print(' =???,  I7777777=                                                                                                                          ')
print('=??????   7777777?   ,:::===?                                                                                                              ')
print('=???????.  777777777777777777~         .77:    ??           :7                                              =$,     :$$$$$$+  =$?          ')
print(' ????????: .777777777777777777         II77    ??           :7                                              $$7     :$?   7$7 =$?          ')
print('  .???????=  +7777777777777777        .7 =7:   ??   :7777+  :7:I777?    ?777I=  77~777? ,777I I7      77   +$?$:    :$?    $$ =$?          ')
print('    ???????+  ~777???+===:::         :7+  ~7   ?? .77    +7 :7?.   II  7~   ,I7 77+   I77   ~7 ?7    =7:  .$, =$    :$?  ,$$? =$?          ')
print('    ,???????~                        77    7:  ?? ?I.     7 :7     :7 ~7      7 77    =7:    7  7    7~   7$   $=   :$$$$$$~  =$?          ')
print('    .???????  ,???I77777777777~     :77777777~ ?? 7:        :7     :7 777777777:77    =7     7  +7  ~7   $$$$$$$$I  :$?       =$?          ')
print('   .???????  ,7777777777777777      7=      77 ?? I+      7 :7     :7 ??      7,77    =7     7   7~ 7,  =$7     $$, :$?       =$?          ')
print('  .???????. I77777777777777777     +7       ,7???  77    I7 :7     :7  7~   .?7 77    =7     7   ,77I   $+       7$ :$?       =$?          ')
print(' ,???????= :77777777777777777~     7=        ~7??  ~I77777  :7     :7  ,777777. 77    =7     7    77,  +$        .$::$?       =$?          ')
print(',???????  :7777777                                                                                77                                       ')
print(' =?????  ,7777777                                                                               77=                                        ')
print('   +?+  7777777?                                                                                                                           ')
print('    +  ~7777777                                                                                                                            ')
print('       I777777                                                                                                                             ')
print('          :~                                                                                                                               ')
	 

#Create the AlchemyAPI Object
alchemyapi = AlchemyAPI()

print('')
print('')

print('############################################')
print('#   Text Extraction Example                #')
print('############################################')
print('')
print('')

print('Processing url: ', demo_url)
print('')

response = alchemyapi.text('url',demo_url)

if response['status'] == 'OK':
	print('## Response Object ##')
	print(json.dumps(response, indent=4))

	print('')
	print('## Text ##')
	print('text: ', response['text'].encode('utf-8'))
	print('')
else:
	print('Error in text extraction call: ', response['statusInfo'])



print('')
print('')
print('')
print('############################################')
print('#   Author Extraction Example              #')
print('############################################')
print('')
print('')

print('Processing url: ', demo_url)
print('')

response = alchemyapi.author('url',demo_url)

if response['status'] == 'OK':
	print('## Response Object ##')
	print(json.dumps(response, indent=4))

	print('')
	print('## Author ##')
	print('author: ', response['author'].encode('utf-8'))
	print('')
else:
	print('Error in author extraction call: ', response['statusInfo'])



print('')
print('')
print('')


print('')
print('')
print('')
print('############################################')
print('#   Title Extraction Example               #')
print('############################################')
print('')
print('')

print('Processing url: ', demo_url)
print('')

response = alchemyapi.title('url',demo_url)

if response['status'] == 'OK':
	print('## Response Object ##')
	print(json.dumps(response, indent=4))


	print('')
	print('## Title ##')
	print('title: ', response['title'].encode('utf-8'))
	print('')
else:
	print('Error in title extraction call: ', response['statusInfo'])



print('')
print('')
print('')


print('')
print('')
print('')

print('############################################')
print('#   Image Extraction Example               #')
print('############################################')
print('')
print('')

print('Processing url: ', demo_url)
print('')

response = alchemyapi.imageExtraction('url',demo_url)

if response['status'] == 'OK':
	print('## Response Object ##')
	print(json.dumps(response, indent=4))

	print('')
	print('## Image ##')
	print('Image: ', response['image'])
	print('')

else:
	print('Error in image extraction call: ', response['statusInfo'])

print('')
print('')


print('')
print('')
print('')
