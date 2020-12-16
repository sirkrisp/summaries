window.MathJax = {
    tex: {
        inlineMath: [ ['$','$'], ["\\(","\\)"] ],
        // displayMath: [['$$', '$$']["\\[", "\\]"]],
        processEscapes: true,
        processEnvironments: true,
        tags: 'ams'
    },
    options: {
    //   ignoreHtmlClass: ".*|",
      processHtmlClass: "arithmatex"
    }
  };

// window.MathJax = {
//     loader: {
//       load: ['[tex]/tagformat']
//     },
//     startup: {
//       pageReady: () => {
//         alert('Running MathJax')l;
//         return MathJax.startup.defaultPageReady();
//       }
//     },
//     tex: {
//       packages: {'[+]': ['tagformat']},
//       tagSide: 'left',
//       macros: {
//         RR: '{\\bf R}',
//         bold: ['{\\bf #1}',1]
//       },
//       tagformat: {
//          tag: (n) => '[' + n + ']'
//       },
//       tags: 'ams',
//     },
    
// };