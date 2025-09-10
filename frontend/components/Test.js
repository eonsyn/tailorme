    import React, { useRef } from 'react';
    import { useReactToPrint } from 'react-to-print';

    const Test = () => {
      const componentRef = useRef();
      const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'My Document Title', // Optional: Customize print dialog title
      });

      return (
        <div>
          <div ref={componentRef}>
            {/* Your HTML content to be printed */}
            <h1>Hello, World!</h1>
            <p>This is some content to be printed.</p>
          </div>
          <button onClick={handlePrint}>Print this content</button>
        </div>
      );
    };

    export default Test;