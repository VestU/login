import os
import gzip

def process( directory ):

    for dirpath , dnames , fnames in os.walk( directory ):
        for f in fnames:
            if f.endswith( '.gz' ):
                print( 'Delete:' + f )
                os.remove( dirpath + os.sep + f )

    for dirpath , dnames , fnames in os.walk( directory ):
        for f in fnames:
            if f.startswith( '.' ):
                print( 'ignore:' + dirpath + os.sep + f )
                continue
            print( 'gzip:' + dirpath + os.sep + f )
            file_input = open( dirpath + os.sep + f , 'rb')
            file_output = gzip.open( dirpath + os.sep + f + '.gz', 'wb')
            file_output.writelines( file_input )
            file_output.close()
            file_input.close()

#paths to process
process( './static' )