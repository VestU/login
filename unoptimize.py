import os
import gzip

def process( directory ):

    for dirpath , dnames , fnames in os.walk( directory ):
        for f in fnames:
            if f.endswith( '.gz' ):
                print( 'Delete:' + f )
                os.remove( dirpath + os.sep + f )

#paths to process
process( './static' )