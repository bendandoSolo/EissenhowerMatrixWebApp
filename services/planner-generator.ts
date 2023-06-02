import {
    AlignmentType,
    BorderStyle,
    Document,
    HeadingLevel,
    Packer,
    Paragraph,
    TabStopPosition,
    TabStopType,
    Table,
    TableCell,
    TableRow,
    TextRun,
    UnderlineType,
    WidthType
  } from 'docx';
  // const PHONE_NUMBER = '07534563401';
  // const PROFILE_URL = 'https://www.linkedin.com/in/dolan1';
  // const EMAIL = 'docx@docx.com';

  export class DocumentCreator {
    // tslint:disable-next-line: typedef
    public create (): Document {
      const document = new Document({
        styles: {
        },
        sections: [
          {
            children: [
              // new Paragraph({
              //   children: [
              //     new TextRun({
              //         text: 'Hello, world!',
              //         color: 'ff0000' // hex color value
              //     })
              //   ],
              //   text: 'BENDANDO HIGH PERFORMANCE WEEKLY PRODUCTIVITY PLANNER',
              //   heading: HeadingLevel.HEADING_2
              // }),
              new Paragraph({
                heading: HeadingLevel.HEADING_2,
                alignment: AlignmentType.CENTER,
                children: [
                    new TextRun({
                        text: 'HIGH PERFORMANCE WEEKLY PRODUCTIVITY PLANNER',
                        bold: true,
                        underline: {
                          type: UnderlineType.SINGLE,
                          color: '000000'
                      },
                      color: '000000'
                    })
                ]
            }),
             // this.createHeading('Long Term Goals'),
             // this.createBorderedParagraph('I have borders on my top and bottom sides!'),
              this.createTable(1)
            ]
          }]
      });
      return document;
    }

  // export class DocumentCreator {
  //   // tslint:disable-next-line: typedef
  //   public create ([experiences, educations, skills, achivements]): Document {
  //     const document = new Document({
  //       sections: [
  //         {
  //           children: [
  //             new Paragraph({
  //               text: 'Dolan Miu',
  //               heading: HeadingLevel.TITLE
  //             }),
  //             this.createContactInfo(PHONE_NUMBER, PROFILE_URL, EMAIL),
  //             this.createHeading('Education'),
  //             ...educations
  //               .map(education => {
  //                 const arr: Paragraph[] = [];
  //                 arr.push(
  //                   this.createInstitutionHeader(
  //                     education.schoolName,
  //                     `${education.startDate.year} - ${education.endDate.year}`
  //                   )
  //                 );
  //                 arr.push(
  //                   this.createRoleText(
  //                     `${education.fieldOfStudy} - ${education.degree}`
  //                   )
  //                 );

  //                 const bulletPoints = this.splitParagraphIntoBullets(
  //                   education.notes
  //                 );
  //                 bulletPoints.forEach(bulletPoint => {
  //                   arr.push(this.createBullet(bulletPoint));
  //                 });

  //                 return arr;
  //               })
  //               .reduce((prev, curr) => prev.concat(curr), []),
  //             this.createHeading('Experience'),
  //             ...experiences
  //               .map(position => {
  //                 const arr: Paragraph[] = [];

  //                 arr.push(
  //                   this.createInstitutionHeader(
  //                     position.company.name,
  //                     this.createPositionDateText(
  //                       position.startDate,
  //                       position.endDate,
  //                       position.isCurrent
  //                     )
  //                   )
  //                 );
  //                 arr.push(this.createRoleText(position.title));

  //                 const bulletPoints = this.splitParagraphIntoBullets(
  //                   position.summary
  //                 );

  //                 bulletPoints.forEach(bulletPoint => {
  //                   arr.push(this.createBullet(bulletPoint));
  //                 });

  //                 return arr;
  //               })
  //               .reduce((prev, curr) => prev.concat(curr), []),
  //             this.createHeading('Skills, Achievements and Interests'),
  //             this.createSubHeading('Skills'),
  //             this.createSkillList(skills),
  //             this.createSubHeading('Achievements'),
  //             ...this.createAchivementsList(achivements),
  //             this.createSubHeading('Interests'),
  //             this.createInterests(
  //               'Programming, Technology, Music Production, Web Design, 3D Modelling, Dancing.'
  //             ),
  //             this.createHeading('References'),
  //             new Paragraph(
  //               'Dr. Dean Mohamedally Director of Postgraduate Studies Department of Computer Science, University College London Malet Place, Bloomsbury, London WC1E d.mohamedally@ucl.ac.uk'
  //             ),
  //             new Paragraph('More references upon request'),
  //             new Paragraph({
  //               text:
  //                 'This CV was generated in real-time based on my Linked-In profile from my personal website www.dolan.bio.',
  //               alignment: AlignmentType.CENTER
  //             })
  //           ]
  //         }
  //       ]
  //     });

  //     return document;
  //   }

  //   public createContactInfo (
  //     phoneNumber: string,
  //     profileUrl: string,
  //     email: string
  //   ): Paragraph {
  //     return new Paragraph({
  //       alignment: AlignmentType.CENTER,
  //       children: [
  //         new TextRun(
  //           `Mobile: ${phoneNumber} | LinkedIn: ${profileUrl} | Email: ${email}`
  //         ),
  //         new TextRun({
  //           text: 'Address: 58 Elm Avenue, Kent ME4 6ER, UK',
  //           break: 1
  //         })
  //       ]
  //     });
  //   }

    public createHeading (text: string): Paragraph {
      return new Paragraph({
        text,
        heading: HeadingLevel.HEADING_1,
        thematicBreak: true
      });
    }

    public createBorderedParagraph (text: string): Paragraph {
      return new Paragraph({
        text: 'I have borders on my top and bottom sides!',
        border: {
            top: {
                color: 'auto',
                space: 1,
                style: BorderStyle.THICK,
                size: 6
            },
            bottom: {
                color: 'auto',
                space: 1,
                style: BorderStyle.THICK,
                size: 6
            },
            left: {
              color: 'auto',
              space: 1,
              style: BorderStyle.THICK,
              size: 6
          },
          right: {
            color: 'auto',
            space: 1,
            style: BorderStyle.THICK,
            size: 6
        }
        }
      });
    }

    public createTable (rows: number): Table {
      return new Table({
        width: {
            size: 100,
            type: WidthType.PERCENTAGE
        },
         rows: [
            new TableRow({
              children: [
                  new TableCell({
                      children: [
                        new Paragraph('“You have no idea how efficient, efficient people get, it’s completely off the chart” – JB Peterson'),
                        new Paragraph('The Average Worker spends 2.1 hours distracted, it takes 21 minutes to get back to work – USE DISTRACTION APP'),
                        new Paragraph('SET SHORT DEADLINES PARKINSON LAW'),
                        new Paragraph('bu-app.com  -> stoicism, Markus Aurelius assess your day'),
                        new Paragraph('DAY DREAMING TAKES AWAY FROM Your DREAMS'),
                        new Paragraph('MIT: START THE DAY WITH THE MOST IMPORTANT TASK '),
                        new Paragraph('PAN ON SUNDAYS')
                    ],
                      borders: {
                        top: { style: BorderStyle.NONE },
                        bottom: { style: BorderStyle.NONE },
                        left: { style: BorderStyle.NONE },
                        right: { style: BorderStyle.NONE }
                        }
                    })
                ]
            })
      ]
        //     new TableRow({
        //       children: [
        //           new TableCell({
        //               children: [new Paragraph('hello this should be a ba')]
        //           })
        //       ]
        //     }),
        //     new TableRow({
        //       children: [
        //           new TableCell({
        //               children: [new Paragraph('Cell 1')],
        //               borders: {
        //                   top: { style: BorderStyle.NONE },
        //                   bottom: { style: BorderStyle.NONE },
        //                   left: { style: BorderStyle.NONE },
        //                   right: { style: BorderStyle.NONE }
        //               }
        //           }
        //           ),
        //           new TableCell({
        //               children: [new Paragraph('Cell 2')],
        //               borders: {
        //                   top: { style: BorderStyle.NONE },
        //                   bottom: { style: BorderStyle.NONE },
        //                   left: { style: BorderStyle.NONE },
        //                   right: { style: BorderStyle.NONE }
        //               }
        //           })
        //       ]
        //     })
        //   ],
        // width: {
        //   size: 100,
        //   type: WidthType.PERCENTAGE
        // },
        // borders: {
        //   top: {
        //     color: '#000000',
        //     space: 1,
        //     style: BorderStyle.THICK,
        //     size: 6
        //   },
        //   bottom: {
        //       color: 'auto',
        //       space: 1,
        //       style: BorderStyle.THICK,
        //       size: 6
        //   },
        //   left: {
        //     color: 'auto',
        //     space: 1,
        //     style: BorderStyle.THICK,
        //     size: 6
        //   },
        //   right: {
        //   color: 'auto',
        //   space: 1,
        //   style: BorderStyle.THICK,
        //   size: 6
        //   }
        // }
    });
  }
}

//     public createTable (rows: number): Table {
//       return new Table({
//         rows: [
//             new TableRow({
//               children: [
//                   new TableCell({
//                       children: [new Paragraph('hello this should be a ba')],
//                       borders: {
//                         top: { style: BorderStyle.NONE },
//                         bottom: { style: BorderStyle.NONE },
//                         left: { style: BorderStyle.NONE },
//                         right: { style: BorderStyle.NONE },
//                         }
//                     })
//                 ]
//             }),
//             new TableRow({
//               children: [
//                   new TableCell({
//                       children: [new Paragraph('hello this should be a ba')]
//                   })
//               ]
//             }),
//             new TableRow({
//               children: [
//                   new TableCell({
//                       children: [new Paragraph('Cell 1')],
//                       borders: {
//                           top: { style: BorderStyle.NONE },
//                           bottom: { style: BorderStyle.NONE },
//                           left: { style: BorderStyle.NONE },
//                           right: { style: BorderStyle.NONE }
//                       }
//                   }
//                   ),
//                   new TableCell({
//                       children: [new Paragraph('Cell 2')],
//                       borders: {
//                           top: { style: BorderStyle.NONE },
//                           bottom: { style: BorderStyle.NONE },
//                           left: { style: BorderStyle.NONE },
//                           right: { style: BorderStyle.NONE }
//                       }
//                   })
//               ]
//             })
//           ],
//         width: {
//           size: 100,
//           type: WidthType.PERCENTAGE
//         },
//         borders: {
//           top: {
//             color: '#000000',
//             space: 1,
//             style: BorderStyle.THICK,
//             size: 6
//           },
//           bottom: {
//               color: 'auto',
//               space: 1,
//               style: BorderStyle.THICK,
//               size: 6
//           },
//           left: {
//             color: 'auto',
//             space: 1,
//             style: BorderStyle.THICK,
//             size: 6
//           },
//           right: {
//           color: 'auto',
//           space: 1,
//           style: BorderStyle.THICK,
//           size: 6
//           }
//         }
//     });
//   }
// }

  //   public createSubHeading (text: string): Paragraph {
  //     return new Paragraph({
  //       text,
  //       heading: HeadingLevel.HEADING_2
  //     });
  //   }

  //   public createInstitutionHeader (
  //     institutionName: string,
  //     dateText: string
  //   ): Paragraph {
  //     return new Paragraph({
  //       tabStops: [
  //         {
  //           type: TabStopType.RIGHT,
  //           position: TabStopPosition.MAX
  //         }
  //       ],
  //       children: [
  //         new TextRun({
  //           text: institutionName,
  //           bold: true
  //         }),
  //         new TextRun({
  //           text: `\t${dateText}`,
  //           bold: true
  //         })
  //       ]
  //     });
  //   }

  //   public createRoleText (roleText: string): Paragraph {
  //     return new Paragraph({
  //       children: [
  //         new TextRun({
  //           text: roleText,
  //           italics: true
  //         })
  //       ]
  //     });
  //   }

  //   public createBullet (text: string): Paragraph {
  //     return new Paragraph({
  //       text,
  //       bullet: {
  //         level: 0
  //       }
  //     });
  //   }

  //   // tslint:disable-next-line:no-any
  //   public createSkillList (skills: any[]): Paragraph {
  //     return new Paragraph({
  //       children: [new TextRun(skills.map(skill => skill.name).join(', ') + '.')]
  //     });
  //   }

  //   // tslint:disable-next-line:no-any
  //   public createAchivementsList (achivements: any[]): Paragraph[] {
  //     return achivements.map(
  //       achievement =>
  //         new Paragraph({
  //           text: achievement.name,
  //           bullet: {
  //             level: 0
  //           }
  //         })
  //     );
  //   }

  //   public createInterests (interests: string): Paragraph {
  //     return new Paragraph({
  //       children: [new TextRun(interests)]
  //     });
  //   }

  //   public splitParagraphIntoBullets (text: string): string[] {
  //     return text.split('\n\n');
  //   }

  //   // tslint:disable-next-line:no-any
  //   public createPositionDateText (
  //     startDate: any,
  //     endDate: any,
  //     isCurrent: boolean
  //   ): string {
  //     const startDateText =
  //       this.getMonthFromInt(startDate.month) + '. ' + startDate.year;
  //     const endDateText = isCurrent
  //       ? 'Present'
  //       : `${this.getMonthFromInt(endDate.month)}. ${endDate.year}`;

  //     return `${startDateText} - ${endDateText}`;
  //   }

  //   public getMonthFromInt (value: number): string {
  //     switch (value) {
  //       case 1:
  //         return 'Jan';
  //       case 2:
  //         return 'Feb';
  //       case 3:
  //         return 'Mar';
  //       case 4:
  //         return 'Apr';
  //       case 5:
  //         return 'May';
  //       case 6:
  //         return 'Jun';
  //       case 7:
  //         return 'Jul';
  //       case 8:
  //         return 'Aug';
  //       case 9:
  //         return 'Sept';
  //       case 10:
  //         return 'Oct';
  //       case 11:
  //         return 'Nov';
  //       case 12:
  //         return 'Dec';
  //       default:
  //         return 'N/A';
  //     }
  //   }
  // }
